"""Module providing Customer Grades."""

# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import fields, models


class CustomerGrades(models.Model):
    _name = "res.partner.grades"
    _description = "Customer Grades"

    name = fields.Char(string="Name", required=True)
    minimum = fields.Float(string="Minimum", required=True)
    maximum = fields.Float(string="Maximum", required=True)
    customer_grades_id = fields.Many2one(
        "res.partner", string="Customer Grades", index=True
    )
