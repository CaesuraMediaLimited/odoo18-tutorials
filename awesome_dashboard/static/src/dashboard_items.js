// Daahboard contents as a list,  closely bound to the statistics that come from the server.
//
import { StatsCard } from "./statscard";
const items = [
   {
      id          : "average_quantity",
      description : "Average amount of t-shirt",
      Component   : StatsCard,
      size        : 2,
      props       : (data) => ({
         title    : "Average amount of t-shirt by order this month",
         value    : data.average_quantity
      }),
   },
   {
      id          : "nb_cancelled_orders",
      description : "Cancelled Orders",
      Component   : StatsCard,
      size        : 2,
      props       : (data) => ({
         title    : "Cancelled Orders",
         value    : data.nb_cancelled_orders,
      }),
   },
   {
      id          : "average_time",
      description : "Average Time",
      Component   : StatsCard,
      size        : 2,
      props       : (data) => ({
         title    : "Average Time",
         value    : data.average_time,
      }),
   },
   {
      id          : "total_amount",
      description : "Total Amount",
      Component   : StatsCard,
      size        : 2,
      props       : (data) => ({
         title    : "Total Amount",
         value    : data.total_amount,
      }),
   },
   {
      id          : "nb_new_orders",
      description : "New Orders",
      Component   : StatsCard,
      size        : 2,
      props       : (data) => ({
         title    : "New Orders",
         value    : data.nb_new_orders,
      }),
   },
   {
      id          : "av_tshirt",
      description : "Average T Shirt sales",
      Component   : StatsCard,
      size        : 2,
      props       : (data) => ({
         title    : "Average T Shirt sales",
         value    : data.avTshirt,
      }),
   },
   /*
   {
      id          : "pie_chart",
      description : "Orders by T-Shirt Size in a nice Pie Chart",
      Component   : StatsCard,
      size        : 2,
      props       : (data) => ({
         title    : "Pie Chart",
         value    : {
            small      : data.orders_by_size.s,
            medium     : data.orders_by_size.m,
            extraLarge : data.orders_by_size.xl,
         }
      }),
   },
   {
      id          : "generic_default",
      description : "Generic Default",
      Component   : StatsCard,
   },
   */
];
export default items;
