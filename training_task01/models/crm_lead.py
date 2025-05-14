# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import fields, models, api, _
from odoo.exceptions import UserError, ValidationError
from odoo.tools.float_utils import float_compare, float_is_zero, float_round

class CrmLead (models.Model):
   _inherit = 'crm.lead'
   _description = "CRM Lead Inherited"

   # Override the user_id and make it depend on  this custom module's is_sales_person
   #
   user_id = fields.Many2one(
        'res.users',
        string="Salesperson",
        domain=[('is_sales_person', '=', True)] # Not a string because this is for the res.users model. Best Practice...
    )

