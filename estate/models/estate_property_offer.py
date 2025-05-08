# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import fields, models, _, api


class EstatePropertyOffer(models.Model):
    _name = "estate.property.offer"
    _description = "Estate Property Offer"
    _order = "price desc"

    price = fields.Float('Price', required=True, default=0.0)
    status = fields.Selection (
       [
          ('accepted', 'Accepted'),
          ('refused', 'Refused'),
       ],
       string="Status",
       required=True,
       copy=False
    )
    validity    = fields.Integer (string="Validity", default=7)
    date_deadline = fields.Date(string="Deadline", compute="_get_date_deadline", inverse="_inverse_date_deadline")

    # https://stackoverflow.com/questions/74185814/using-create-date-automatic-fields-in-odoo
    #
    @api.depends('validity', 'create_date')
    def _get_date_deadline(self):
       for record in self:
          ct = record.create_date or fields.Datetime.now()
          record.date_deadline = fields.Date.add(fields.Datetime.to_datetime(ct), days=record.validity)

    @api.depends('create_date', 'date_deadline')
    def _inverse_date_deadline(self):
       for record in self:
          ct = record.create_date or fields.Datetime.now()
          record.validity = (fields.Datetime.to_datetime(record.date_deadline) - ct).days

    partner_id  = fields.Many2one('res.partner',     string='Partner',  index=True )
    property_id = fields.Many2one('estate.property', string='Property', index=True )
    property_type_id = fields.Many2one(related="property_id.property_type_id", store=True)
