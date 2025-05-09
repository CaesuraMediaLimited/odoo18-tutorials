# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import fields, models


# Create unique property types eg house, mansion, castle, hovel etc.
#
class EstatePropertyType(models.Model):
    _name            = "estate.property.type"
    _description     = "Estate Property Type"
    _order           = "name"

    name             = fields.Char('Name', required=True)
    property_ids     = fields.One2many("estate.property", "property_type_id", string="Types", index=True)
    offer_ids        = fields.One2many("estate.property.offer", "property_type_id", string="Offer Ids")

    _sql_constraints = [
        ('name_unique', 'unique(name)',
         'The property type should be unique')
    ]
