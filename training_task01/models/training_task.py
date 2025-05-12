# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import fields, models, api, _
from odoo.exceptions import UserError, ValidationError
from odoo.tools.float_utils import float_compare, float_is_zero, float_round

# The base module for the Training Task
#
class TrainingTask(models.Model):
    _name              = "training.task"
    _description       = "Training Task"
    _order             = "id desc"

    name               = fields.Char('Name', required  =True)
    description        = fields.Text('Description' )

