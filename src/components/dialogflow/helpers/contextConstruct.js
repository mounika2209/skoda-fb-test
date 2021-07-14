module.exports = {
    getContext(context) {
        if (context.hasOwnProperty('parameters')) {
            return {
                name: context.name,
                lifespanCount: 2,
                parameters: context.parameters
            }
        } else {
            return {
                name: context.name,
                lifespanCount: 2,
            }
        }
    },

    nullifyOutputContext(context) {
        if (context.hasOwnProperty('parameters')) {
            return {
                name: context.name,
                lifespanCount: 0,
                parameters: context.parameters
            }
        } else {
            return {
                name: context.name,
                lifespanCount: 0,
            }
        }
    },

}