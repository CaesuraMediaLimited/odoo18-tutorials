## TrainingTask.docx Andy Cragg/CML

./__init__.py

./__manifest__.py


./security/groups.xml              - 5. Sales Person Editor Group

./security/ir.model.access.csv     - 5. CRM and Sales ACL permissions


./data/new_user.xml                - 5. For testing group permissions.


./models/__init__.py

./models/training_task.py          - The installable module

./models/account_move.py           - 1. Contact Status, 5. Override the invoice to depend on Salespeople only

./models/customer_grades.py        - 2/3. New customer grades.

./models/sale_order.py             - 5. Override the sale order to depend on Salespeople only

./models/res_users.py              - 5. The is_sales_person Boolean

./models/crm_lead.py               - 5. Override the Lead/Opportunity to depend on Salespeople only

./models/res_partner.py            - 1. contact_status 4. Other Addresses 6. credit_limit

./views/res_partner_kanban_inherit.xml - 7. Kanban open in new window

./views/res_users_views.xml            - 5. Sales Person

./views/training_task_views.xml        - General App layout

./views/customer_grades_views.xml      - 2/3. New customer grades.

./views/crm_lead_view.xml              - 5. CRM Sales Editor Group permissions

./views/sale_order_view.xml            - 5. Sales Order Sales Editor Group permissions

./views/res_partner_views.xml          - 8. Move Payment Terms to Accounting tab 4. Other Addresses,

./views/training_task_menus.xml        - General Main menus for the App.
