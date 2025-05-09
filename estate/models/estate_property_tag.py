# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import fields, models

# Create unique tags for each property.
#
class EstatePropertyTag(models.Model):
    _name        = "estate.property.tag"
    _description = "Estate Property Tag"
    _order       = "name"

    name         = fields.Char('Name', required=True)
    _sql_constraints                  = [
        ('name_unique', 'unique(name)',
         'The tag name should be unique')
    ]
    # Note the British spelling.
    #
    colour       = fields.Integer("Tag Colour", default=1)


