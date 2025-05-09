# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import fields, models, api, _
from odoo.exceptions import UserError, ValidationError
from odoo.tools.float_utils import float_compare, float_is_zero, float_round

# The base module for Real Estate Properties for sale.
#
class EstateProperty(models.Model):
    _name              = "estate.property"
    _description       = "Estate Property"
    _order             = "id desc"

    sequence           = fields.Integer('Sequence', default  =1, help  ="Used to order types.")
    name               = fields.Char('Name', required  =True)
    description        = fields.Text('Description' )
    buyer_id           = fields.Many2one('res.partner', copy  =False, string  ='Buyer', index  =True )
    offer_ids          = fields.One2many("estate.property.offer", "property_id", string  ="Offers", index  =True)
    best_price         = fields.Float (compute  ="_get_best_price", string  ="Best Offer")
    postcode           = fields.Char('Postcode')
    expected_price     = fields.Float('Expected Price', required  =True)
    selling_price      = fields.Float('Selling Price', copy  =False)
    bedrooms           = fields.Integer("Bedrooms", default  =2)
    living_area        = fields.Integer("Living rooms")
    facades            = fields.Integer("Facades")
    garage             = fields.Boolean(string  ="Garage")
    active             = fields.Boolean(string  ="Active", default  =True)
    garden             = fields.Boolean(string  ="Garden")
    garden_area        = fields.Integer("Garden Area")
    garden_orientation = fields.Selection (
       [
          ('north', 'North'),
          ('south', 'South'),
          ('west', 'West'),
          ('east','East'),
       ],
       string="Garden Orientation",
       required=True,
    )
    state              = fields.Selection (
       [
          ('new'           , 'New'           ),
          ('offer_received', 'Offer Received'),
          ('offer_accepted', 'Offer Accepted'),
          ('sold'          , 'Sold'          ),
          ('cancelled'     , 'Cancelled'     ),
       ],
       string   = "State",
       required = True,
       copy     = False,
       default  = 'new',
    )
    date_availability   = fields.Date('Available Date',
        required = True,
        index    = True,
        default  = fields.Date.add(fields.Date.today(), months=3),
        copy     = False,
    )

    # Related fields.
    #
    property_type_id = fields.Many2one("estate.property.type", string="Property Type")
    property_tag_id  = fields.Many2many("estate.property.tag", string="Property Tag")
    salesperson_id   = fields.Many2one('res.users', string='Salesperson', index=True, default=lambda self: self.env.user)

    # Calculate the highest price offered so far.
    #
    @api.depends("offer_ids.price")
    def _get_best_price(self):
       for record in self:
          # max(record.offer_ids.mapped('price')) returned an empty list.
          record.best_price = 0
          for this_price in record.offer_ids.mapped('price'):
             if (this_price > record.best_price):
                record.best_price = this_price

    # SQL Contraints : name, condition, message tuple.
    #
    _sql_constraints = [
        ('check_expected_price', 'CHECK(expected_price > 0)',
         'The expected price should be above 0')
    ]
    _sql_constraints = [
        ('check_selling_price', 'CHECK(selling_price > 0)',
         'The selling price should be above 0')
    ]

    # Python contstraints.
    #
    @api.constrains('selling_price', 'expected_price')
    def _check_selling_price(self):
       for record in self:
          if (float_compare(record.selling_price, \
                record.expected_price * 0.9, precision_rounding=5) <= 0):
             raise ValidationError("Selling Price cannot be less than 90% of expected price")

    # When garden checkbox is clicked, set default garden attributes.
    #
    @api.onchange("garden")
    def _onchangegarden (self):
       if self.garden:
          self.garden_area = 10
          self.garden_orientation = 'north'
       else:
          self.garden_area = None
          self.garden_orientation = None

    # Prevent user deleting and active property.
    #
    @api.ondelete(at_uninstall=False)
    def _unlink_if_not_active(self):
       for record in self:
          if (record.state != 'new' and record.state != 'cancelled'):
             raise UserError("Can't delete an active property!")

    # Button to set the property as Sold, except when cancelled.
    #
    def set_property_sold(self):
       for record in self:
          if record.state == 'cancelled':
             raise UserError("Can't sell an deleted property!")
          else:
             record.state = 'sold'
          return True

    # Button to set the property as Cacncelled, except when Sold.
    #
    def set_property_cancelled(self):
       for record in self:
          if record.state == 'sold':
             raise UserError("Can't cancel a sold property!")
          else:
             record.state = 'cancelled'
          return True

