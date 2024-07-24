define(['knockout', 'ojs/ojcontext','ojs/ojcorerouter', 'ojs/ojknockoutrouteradapter', 'ojs/ojurlparamadapter', 'ojs/ojarraydataprovider', "ojs/ojarraytreedataprovider",
   'ojs/ojmodule-element', 'ojs/ojknockout',"ojs/ojnavigationlist", "ojs/ojtreeview" ],
 function(ko, Context, CoreRouter, KnockoutRouterAdapter, UrlParamAdapter, ArrayDataProvider, ArrayTreeDataProvider) {
    function ControllerViewModel() {

        // Media queries for responsive layouts
        // const smQuery = ResponsiveUtils.getFrameworkQuery(ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
        // this.smScreen = ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);

        this.routes = [
            { path: "", redirect: "dashboard" }, // Default route redirects to 'dashboard'
            { path: "dashboard", detail: { label: "Dashboard" } },
            { path: "incidents", detail: { label: "Incidents" } },
            { path: "customers", detail: { label: "Customers" } },
            { path: "about", detail: { label: "About" } },
          ];
          let jsonData = [
            {
              "title": "News",
              "id": "news"
            },
            {
              "title": "Blogs",
              "id": "blogs",
              "children": [
                {
                  "title": "Today",
                  "id": "today"
                },
                {
                  "title": "Yesterday",
                  "id": "yesterday"
                },
                {
                  "title": "Archive",
                  "id": "archive"
                }
              ]
            },
            {
              "title": "Links",
              "id": "links",
              "children": [
                {
                  "title": "Oracle",
                  "id": "oracle",
                  "children": [
                    {
                      "title": "USA",
                      "id": "usa",
                      "children": [
                        {
                          "title": "Northeast",
                          "id": "northeast"
                        },
                        {
                          "title": "Midwest",
                          "id": "midwest"
                        },
                        {
                          "title": "South",
                          "id": "south"
                        },
                        {
                          "title": "West",
                          "id": "west"
                        }
                      ]
                    },
                    {
                      "title": "Europe",
                      "id": "europe"
                    },
                    {
                      "title": "Asia",
                      "id": "asia",
                      "children": [
                        {
                          "title": "Japan",
                          "id": "japan"
                        },
                        {
                          "title": "China",
                          "id": "china"
                        },
                        {
                          "title": "India",
                          "id": "india"
                        }
                      ]
                    }
                  ]
                },
                {
                  "title": "IBM",
                  "id": "ibm"
                },
                {
                  "title": "Microsoft",
                  "id": "microsoft"
                }
              ]
            }
          ];
          this.data = new ArrayTreeDataProvider(jsonData, {
            keyAttributes: "id",
        });

          // Create ADP with partial array, excluding first redirect route
          this.dataProvider = new ArrayDataProvider(this.routes.slice(1), {
              keyAttributes: "path",
          });
          // Create the router with the routes
          this.router = new CoreRouter(this.routes, {
            urlAdapter: new UrlParamAdapter(),
          });
          this.selection = new KnockoutRouterAdapter(this.router);
          // Synchronize the router, causing it to go to its default route
          this.router.sync();
    }
    
    // release the application bootstrap busy state
    Context.getPageContext().getBusyContext().applicationBootstrapComplete();
    
    return ControllerViewModel; 
}
);