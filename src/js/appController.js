define(['knockout', 'ojs/ojcontext','ojs/ojcorerouter', 'ojs/ojknockoutrouteradapter', 'ojs/ojurlparamadapter','ojs/ojarraydataprovider',
   'ojs/ojmodule-element', 'ojs/ojknockout',"ojs/ojnavigationlist"],
 function(ko, Context, CoreRouter, KnockoutRouterAdapter, UrlParamAdapter, ArrayDataProvider) {
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