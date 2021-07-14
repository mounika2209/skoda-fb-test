const contextConstruct = require('./contextConstruct');
const cons = require('consolidate');
const { Context } = require('mustache');

var mycode = module.exports = {
        getOutputContext: (context, contextnames) => {
            let nextContext = [];
            let outputContexts = [];
            return new Promise((resolve, reject) => {
            


                 context.forEach((outputContext, index) => {
                    let name = outputContext.name;
                    outputContexts.push(outputContext);

                   /*  console.log("name....output-context",name)
                    console.log("index....",index) */
                    contextnames.forEach((contextname, i) => {
                       /*  console.log(i)
                        console.log("name..inside",contextname) */
                        if (name.includes(contextname)) {
                            updatedContext = contextConstruct.getContext(outputContext)
                            nextContext.push(updatedContext)
                           // console.log('check',i,nextContext)
                        }
                        if (index == context.length - 1) {
                           // console.log("last........",Context.length)
                            resolve(nextContext);
                        }
                    })
                  
                    // if(index == context.length -1){
                    //     outputContexts.forEach((outputData,i) => {
                    //        /*  nextContext.forEach((zeroContext,i) => {
                    //             if(zeroContext.name != outputData.name)
                    //             {
                    //                 updatedContext = contextConstruct.nullifyOutputContext(outputData)
                    //                 nextContext.push(updatedContext)

                    //             }
                    //             console.log(i,zeroContext.name)
                    //             console.log("out-put",outputData.name)

                    //         }) */

                    //        let check = nextContext.find(zeroContext => zeroContext.name != outputData.name);
                    //        console.log('llllkkkkkkkkkkkkk',check.name)
                    //        console.log('llllkkkkkdfddfdkkkkkkkk',outputData.name)

                    //        if(check.name == outputData.name)
                    //        {
                    //            console.log(i,outputData)
                    //         updatedContext = contextConstruct.nullifyOutputContext(outputData)
                    //         nextContext.push(updatedContext)
                    //         resolve(nextContext);  
                    //        }
                    //        /*  if(nextContext.find(e => e != outputData)){ console.log('jjjjjjjjjjj',nextContext)
                    //             updatedContext = contextConstruct.nullifyOutputContext(outputData)
                    //             nextContext.push(updatedContext)
                    //             resolve(nextContext);


                    //         } */
                    //     })
                    //   /*  nextContext.forEach((zeroContext,i) => {
                    //        if( outputContexts.find(e => e = zeroContext.name))
                    //        {
                    //         updatedContext = contextConstruct.nullifyOutputContext(outputContext)
                    //         nextContext.push(updatedContext)
                    //        }
                    //        console.log(zeroContext.name);
                          
                    //    }); */

                    // }

                });

            })


        },
        getZeroOutputContext: (context) => {
            let nextContext = [];
            return new Promise((resolve, reject) => {
                context.forEach((outputContext, index) => {
                    let name = outputContext.name;
                    updatedContext = contextConstruct.nullifyOutputContext(outputContext)
                    nextContext.push(updatedContext)
                    /* contextnames.forEach((contextname, i) => {
                        if (name.includes(contextname)) {
                            updatedContext = contextConstruct.getContext(outputContext)
                            nextContext.push(updatedContext)
                        } else if (!name.includes('sessionstart')) {
                            updatedContext = contextConstruct.nullifyOutputContext(outputContext)
                            nextContext.push(updatedContext)
                        }
                        if (index == context.length - 1) {
                            resolve(nextContext);
                        }
                    }) */
                    if (index == context.length - 1) {
                        resolve(nextContext);
                    }
                });
            })
        },
        getZeroItsmOutputContext: (context) => {
            let nextContext = [];
            return new Promise((resolve, reject) => {
                context.forEach((outputContext, index) => {
                    let name = outputContext.name;
                    if(name.includes('initialmessage-followup')){
                        updatedContext = contextConstruct.nullifyOutputContext(outputContext)
                        nextContext.push(updatedContext)
                    }
                    updatedContext = contextConstruct.nullifyOutputContext(outputContext)
                    nextContext.push(updatedContext)
                    /* contextnames.forEach((contextname, i) => {
                        if (name.includes(contextname)) {
                            updatedContext = contextConstruct.getContext(outputContext)
                            nextContext.push(updatedContext)
                        } else if (!name.includes('sessionstart')) {
                            updatedContext = contextConstruct.nullifyOutputContext(outputContext)
                            nextContext.push(updatedContext)
                        }
                        if (index == context.length - 1) {
                            resolve(nextContext);
                        }
                    }) */
                    if (index == context.length - 1) {
                        resolve(nextContext);
                    }
                });
            })
        },
        zeroOutputContext: (context, contextnames) => {
            let nextContext = [];
            let outputContexts = [];
            let d = [];
            return new Promise((resolve, reject) => {
    
                context.forEach((outputContext,index) => {
                    let name = outputContext.name;
                    outputContexts.push(outputContext);
                    let nameSplit = outputContext.name.split('/');
                    let check = nameSplit[nameSplit.length - 1];
                    contextnames.forEach((contextname,i) => { 
    
                        if(check == contextname) {
                            d.push(contextname)
                           //console.log("context 2 value",outputContexts)
                           updatedContext = contextConstruct.getContext(outputContext)
                           nextContext.push(updatedContext)
                        }
                    });
    
                    if(!(d.includes(check))){
                       // console.log(" value as to do zero::::::::::::::::::",outputContexts)
                        updatedContext = contextConstruct.nullifyOutputContext(outputContext)
                        nextContext.push(updatedContext)
                    }
                    if(index == context.length - 1){
                        
                        resolve(nextContext);
    
                    }
    
                }); 
            
    
    
            })
    
    
        }
        
    
}