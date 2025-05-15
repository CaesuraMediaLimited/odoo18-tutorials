"""Module inheriting sale.order."""

# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import fields, models


class SaleOrder(models.Model):
    _inherit = "sale.order"
    _description = "Sale Order Inherited"

    # Override the user_id (Salesperson) and make it depend on  this custom module's is_sales_person
    # Only accessible by the people in the group_sales_person_editor group.
    #
    user_id = fields.Many2one(
        "res.users",
        string="Salesperson",
        domain=[("is_sales_person", "=", True)],
        # groups="training_task01.group_sales_person_editor"
    )
