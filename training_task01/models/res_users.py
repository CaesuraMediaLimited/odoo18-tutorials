"""Module inheriting res.users."""

# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import fields, models

class SalesPeople(models.Model):
    _inherit = "res.users"
    _description = "Sales People"

    name = fields.Char(string="Name")
    is_sales_person = fields.Boolean(string="Sales Person")
