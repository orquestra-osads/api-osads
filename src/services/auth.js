module.exports = {
    Auth(){
        var role = sessionStorage.getItem('_role')
        if(!role)
            return false
    
        return true
    }
    }