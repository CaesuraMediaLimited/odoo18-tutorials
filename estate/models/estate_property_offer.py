# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import fields, models


class EstatePropertyOffer(models.Model):
    _name = "estate.property.offer"
    _description = "Estate Property Offer"

    price = fields.Float('Price', required=True)
    status = fields.Selection (
       [
          ('accepted', 'Accepted'),
          ('refused', 'Refused'),
       ],
       string="Status",
       required=True,
       copy=False
    )
    partner_id  = fields.Many2one('res.partner',     string='Partner',  index=True )
    property_id = fields.Many2one('estate.property', string='Property', index=True )
