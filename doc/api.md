#Index

**Modules**

* [periodicjs.ext.googleanalytics](#periodicjs.ext.module_googleanalytics)
* [googleanalyticsController](#module_googleanalyticsController)

**Functions**

* [postDataQueryFunction(serverobj, asynccallback)](#postDataQueryFunction)
 
<a name="periodicjs.ext.module_googleanalytics"></a>
#periodicjs.ext.googleanalytics
Adds giigke analytics to footer.

**Params**

- periodic `object` - variable injection of resources from current periodic instance  

**Author**: Yaw Joseph Etse  
**License**: MIT  
**Copyright**: Copyright (c) 2014 Typesettin. All rights reserved.  
<a name="module_googleanalyticsController"></a>
#googleanalyticsController
googleanalytics controller

**Params**

- resources `object` - variable injection from current periodic instance with references to the active logger and mongo session  

**Returns**: `object` - googleanalytics  
**Author**: Yaw Joseph Etse  
**License**: MIT  
**Copyright**: Copyright (c) 2014 Typesettin. All rights reserved.  
<a name="postDataQueryFunction"></a>
#postDataQueryFunction(serverobj, asynccallback)
add google analytics to footer

**Params**

- serverobj `object` - object passed from core.controller.handleDocumentQueryRender that has {req,res}  
- asynccallback `object`  

**Returns**: `function` - adds google analytics to footer  
