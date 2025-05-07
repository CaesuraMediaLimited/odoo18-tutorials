# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import fields, models


class EstatePropertyType(models.Model):
    _name = "estate.property.type"
    _description = "Estate Property"

    name = fields.Char('Name', required=True)
    _sql_constraints = [
        ('name_unique', 'unique(name)',
         'The property type should be unique')
    ]


