# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import fields, models


class EstateAccount(models.Model):
   _inherit = "estate.property"
   _description = "Estate Property Account"

   name = fields.Char('Name', required=True)

   def set_property_sold(self):
      print ("set_property_sold overridden")
      return super().set_property_sold()
