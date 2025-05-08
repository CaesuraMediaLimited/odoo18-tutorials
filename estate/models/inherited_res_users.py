# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import fields, models, api, _
from odoo.exceptions import UserError, ValidationError
from odoo.tools.float_utils import float_compare, float_is_zero, float_round

class InheritedResUsers(models.Model):
   _inherit = "res.users"
   _description = "Inherited res.users"

   property_ids = fields.One2many(
      "estate.property", "salesperson_id", string="Properties", domain=[("state", "in", ["new", "offer_received"])]
   )

