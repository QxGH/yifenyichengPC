//操作storage
var storage = {
    setStorage: function(key,value) {
        var data = {
            value: value
        };
        localStorage[key]= JSON.stringify(data);
    },
    getStorage: function(key) {
        var data = localStorage[key];
        if(!data || data == "null"){
            return null;
        }
        return JSON.parse(data);
    }
};
export default storage;
