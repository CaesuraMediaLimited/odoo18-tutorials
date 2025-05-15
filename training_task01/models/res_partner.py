# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import fields, models, api, _
from odoo.exceptions import UserError, ValidationError
from odoo.tools.float_utils import float_compare, float_is_zero, float_round

import logging
_logger = logging.getLogger(__name__)


class ResPartner(models.Model):
   _inherit     = 'res.partner'
   _description = "Inherited res.partner"

   # Set readonly in the UI, not here as the Python needs to change it.
   #
   contact_status = fields.Selection (
      [
         ('suspect', 'Suspect'),
         ('prospect', 'Prospect'),
         ('customer', 'Customer'),
      ],
      string   = "Contact Status",
      default  = 'suspect',
   )
   total_est_revenue   = fields.Float    ('Total Est. Revenue', required=True, default=0.0)
   customer_grades_id  = fields.Many2many("res.partner.grades", string="Customer Grades")
   company_contact_address_id = fields.Many2one(
      'res.partner',
      string="Company Contact Addresses",
      domain="[('type', 'in', ('contact', '')), '|', ('id', '=', parent_id), ('parent_id', '=', parent_id)]"
   )
   @api.onchange("company_contact_address_id")
   def _onchangeccai (self):
      for partner in self:
         # .id ie not .partner_id because "AttributeError: 'res.partner' object has no attribute 'partner_id'
         # Obvs.
         selected_contact = self.env['res.partner'].browse(partner.company_contact_address_id.id)
         print (f"selected_contact Name : {selected_contact.name}")
         partner.street = selected_contact.street
         partner.street2 = selected_contact.street2
         partner.city = selected_contact.city
         partner.state_id = selected_contact.state_id
         partner.country_id = selected_contact.country_id
         partner.zip = selected_contact.zip
         partner.phone = selected_contact.phone
         partner.email = selected_contact.email
         partner.website = selected_contact.website


   @api.onchange('total_est_revenue')
   def _onchange_total_est_revenue(self):
      for partner in self:
         if partner.total_est_revenue and partner.contact_status == 'suspect':
            partner.contact_status = 'prospect'

   # 6. For customers that have a credit limit, the value of the "Payment Terms" field will default to 'End of the following month'.
   #
   # http://localhost:8069/odoo/customers/20/res.partner/10?debug=assets
   # ~/Odoo18/odoo/addons/account/models/partner.py
   # property_payment_term_id          : Customer Payment Terms
   # property_supplier_payment_term_id : Vendor Payment Terms
   # credit_limit                      : Credit limit specific to this partner.
   #
   # I've added credit_limit to the View and here we set the payment Terms (customer and vendor).
   #
   @api.onchange("credit_limit")
   def _onchangecl (self):
      for partner in self:
         if partner.credit_limit > 0.0:
            # Safer than looking for the string 'End of the following month'.
            #
            payment_term = self.env.ref('account.account_payment_term_end_following_month')
            self.property_payment_term_id          = payment_term.id
            self.property_supplier_payment_term_id = payment_term.id
            _logger.info('payment Terms updated to end of following month')

