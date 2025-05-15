"""Basic TRaining Task Module."""

# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import fields, models

# The base module for the Training Task
#
class TrainingTask(models.Model):
    _name = "training.task"
    _description = "Training Task"
    _order = "id desc"

    name = fields.Char("Name", required=True)
    description = fields.Text("Description")
