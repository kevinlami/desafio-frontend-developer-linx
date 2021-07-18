document.getElementById('a-arrow').onclick=function(){
    if ( document.getElementById("info").classList.contains('show') ) {
        document.getElementById("info").classList.remove('show');
    } else {
        document.getElementById("info").classList.add('show');
    }
};