# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import fields, models, api, _
from odoo.exceptions import UserError

class RecurringPlan(models.Model):
    _name = "estate.property"
    _description = "Estate Property"

    name = fields.Char('Name', required=True)
    description = fields.Text('Description' )
    property_type_id = fields.Many2one("estate.property.type", string="Property Type")
    property_tag_id = fields.Many2many("estate.property.tag", string="Property Tag")
    salesperson_id = fields.Many2one('res.users', string='Salesperson', index=True, default=lambda self: self.env.user)
    buyer_id = fields.Many2one('res.partner', copy=False, string='Buyer', index=True )
    offer_ids = fields.One2many("estate.property.offer", "property_id", string="Offers", index=True)

    wibble = fields.Float(compute="_update_wibble", inverse="_update_wobble", string='Calculated Value')
    wobble = fields.Float(string='Type Here')

    @api.depends("wobble")
    def _update_wibble (self):
       for record in self:
          record.wibble = record.wobble * 2
    def _update_wobble (self):
       for record in self:
          record.wobble = record.wibble / 2

    def action_do_something (self):
       for record in self:
          record.name="This is a new property"
          raise UserError(_('User Error, but we will not say what it is, even though we know'))
       return True

    postcode = fields.Char('Postcode')
    date_availability = fields.Date('Available Date',
        required=True,
        index=True,
        default=fields.Date.add(fields.Date.today(), months=3),
        copy=False,
    )
    expected_price = fields.Float('Expected Price', required=True)
    _sql_constraints = [
        ('check_expected_price', 'CHECK(expected_price > 0)',
         'The expected price should be above 0')
    ]
    selling_price = fields.Float('Selling Price', readonly=True,copy=False)
    _sql_constraints = [
        ('check_selling_price', 'CHECK(selling_price > 0)',
         'The selling price should be above 0')
    ]
    bedrooms = fields.Integer("Bedrooms", default=2)
    living_area = fields.Integer("Living rooms")
    facades = fields.Integer("Facades")
    garage = fields.Boolean(string="Garage")
    active=fields.Boolean(string="Active", default=True)

    garden = fields.Boolean(string="Garden")
    garden_area = fields.Integer("Garden Area")
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
    @api.onchange("garden")
    def _onchangegarden (self):
       if self.garden:
          self.garden_area = 10
          self.garden_orientation = 'north'
       else:
          self.garden_area = None
          self.garden_orientation = None
       return {'warning': {
                'title': _("Warning"),
                'message': ('This option is not supported.')}}

    state = fields.Selection (
       [
          ('new', 'New'),
          ('offer_received', 'Offer Received'),
          ('offer_accepted', 'Offer Accepted'),
          ('sold','Sold'),
          ('cancelled','Cancelled'),
       ],
       string="State",
       required=True,
       copy=False,
       default='new',
    )



