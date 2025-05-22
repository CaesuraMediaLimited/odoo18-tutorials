// Daahboard contents as a list,  closely bound to the statistics that come from the server.
//
import { StatsCard } from "./statscard";
import { PieChart } from "./piechart";
import { Registry } from "@web/core/registry";
const dashboardRegistry = new Registry();

dashboardRegistry.add("average_quantity",
   {
      id          : "average_quantity",
      description : "Average amount of t-shirt",
      Component   : StatsCard,
      size        : 2,
      props       : (data) => ({
         title    : "Average amount of t-shirt by order this month",
         value    : data.average_quantity
      }),
   }
);
dashboardRegistry.add("nb_cancelled_orders",
   {
      id          : "nb_cancelled_orders",
      description : "Cancelled Orders",
      Component   : StatsCard,
      size        : 2,
      props       : (data) => ({
         title    : "Cancelled Orders",
         value    : data.nb_cancelled_orders,
      }),
   }
);
dashboardRegistry.add("average_time",
   {
      id          : "average_time",
      description : "Average Time",
      Component   : StatsCard,
      size        : 2,
      props       : (data) => ({
         title    : "Average Time",
         value    : data.average_time,
      }),
   }
);
dashboardRegistry.add("total_amount",
   {
      id          : "total_amount",
      description : "Total Amount",
      Component   : StatsCard,
      size        : 2,
      props       : (data) => ({
         title    : "Total Amount",
         value    : data.total_amount,
      }),
   }
);
dashboardRegistry.add("nb_new_orders",
   {
      id          : "nb_new_orders",
      description : "New Orders",
      Component   : StatsCard,
      size        : 2,
      props       : (data) => ({
         title    : "New Orders",
         value    : data.nb_new_orders,
      }),
   }
);
dashboardRegistry.add("av_tshirt",
   {
      id          : "av_tshirt",
      description : "Average T Shirt sales",
      Component   : StatsCard,
      size        : 2,
      props       : (data) => ({
         title    : "Average T Shirt sales",
         value    : data.avTshirt,
      }),
   }
);
dashboardRegistry.add("pie_chart",
   {
      id          : "pie_chart",
      description : "Orders by T-Shirt Size in a nice Pie Chart",
      Component   : PieChart,
      size        : 2,
      props       : (data) => ({
         title    : "Pie Chart",
         value    : {
            small      : data.orders_by_size.s,
            medium     : data.orders_by_size.m,
            extraLarge : data.orders_by_size.xl,
         }
      }),
   }
);
dashboardRegistry.add("pie_chart2",
   {
      id          : "pie_chart2",
      description : "Orders by T-Shirt Size in a nice Pie Chart - 2",
      Component   : PieChart,
      size        : 3,
      props       : (data) => ({
         title    : "Pie Chart - 2",
         value    : {
            small      : data.orders_by_size.s,
            medium     : data.orders_by_size.m,
            extraLarge : data.orders_by_size.xl,
         }
      }),
   }
);
dashboardRegistry.add("pie_chart3",
   {
      id          : "pie_chart3",
      description : "Orders by T-Shirt Size in a nice Pie Chart - 3",
      Component   : PieChart,
      size        : 3,
      props       : (data) => ({
         title    : "Pie Chart - 3",
         value    : {
            small      : data.orders_by_size.s,
            medium     : data.orders_by_size.m,
            extraLarge : data.orders_by_size.xl,
         }
      }),
   }
);
export default dashboardRegistry;
