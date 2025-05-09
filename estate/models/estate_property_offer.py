# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import fields, models, _, api
from odoo.exceptions import UserError, ValidationError

# Price Offers on a property
#
class EstatePropertyOffer(models.Model):
    _name         = "estate.property.offer"
    _description  = "Estate Property Offer"
    _order        = "price desc"

    price         = fields.Float   ('Price', required=True, default=0.0)
    status        = fields.Selection (
       [
          ('no_offer', 'No Offer'),
          ('accepted', 'Accepted'),
          ('refused' , 'Refused' ),
       ],
       string  = "Status",
       copy    = False,
       default = 'no_offer',
    )

    # https://stackoverflow.com/questions/74185814/using-create-date-automatic-fields-in-odoo
    #
    # validity and date_deadline depend on each other.
    #
    validity      = fields.Integer (string="Validity", default=7)
    date_deadline = fields.Date    (string="Deadline", compute="_get_date_deadline", inverse="_inverse_date_deadline")
    @api.depends('validity', 'create_date')

    def _get_date_deadline(self):
       for record in self:
          ct                   = record.create_date or fields.Datetime.now()
          record.date_deadline = fields.Date.add(fields.Datetime.to_datetime(ct), days=record.validity)

    @api.depends('create_date', 'date_deadline')
    def _inverse_date_deadline(self):
       for record in self:
          ct                   = record.create_date or fields.Datetime.now()
          record.validity      = (fields.Datetime.to_datetime(record.date_deadline) - ct).days

    # Relationships.
    #
    partner_id       = fields.Many2one('res.partner',     string='Partner',  index=True )
    property_id      = fields.Many2one('estate.property', string='Property', index=True )
    property_type_id = fields.Many2one(related="property_id.property_type_id", store=True)

    # Public methods on offer.
    #
    def accept_offer(self):
       for record in self:
          if record.status == 'accepted':
             raise UserError("Too late! Offer already accepted.")
          else:
             record.status = 'accepted'
             record.property_id.selling_price = record.price
             record.property_id.buyer_id      = record.partner_id
             record.property_id.state         = 'offer_accepted'
       return True
    def refuse_offer(self):
       for record in self:
          record.status = 'refused'
       return True

    # On Create check the offer is higher than the best offer so far and set the 
    # state Offer Received.
    #
    @api.model
    def create(self, vals):
        if vals.get("property_id") and vals.get("price"):
            prop = self.env["estate.property"].browse(vals["property_id"])
            if prop.offer_ids:
                max_offer = max(prop.mapped("offer_ids.price"))
                if float_compare(vals["price"], max_offer, precision_rounding=0.01) <= 0:
                    raise UserError("The offer must be higher than %.2f" % max_offer)
            prop.state = "offer_received"
        return super().create(vals)
