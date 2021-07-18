document.getElementById('a-arrow').onclick=function(){
    if ( document.getElementById("info").classList.contains('show') ) {
        document.getElementById("info").classList.remove('show');
    } else {
        document.getElementById("info").classList.add('show');
    }
};

$("#cpf").on("keyup", function(){
    formatCPF('###.###.###-##', this);
});
 
 $("#algorithm-form").on("submit", function(){
    
    var cpf = $("#cpf").val().replace(/[.|-]/g,'');
    
    if( !checkCPF(cpf) ){
        document.getElementById("cpf-erro").classList.add('invalido');
        return false
    }
});
 
function formatCPF(m,d){
    var i = d.value.length;
    if(i < 14){
        var s = m.substring(0,1);
        var t = m.substring(i);
        if (t.substring(0,1) != s){
            d.value += t.substring(0,1);
        }

        if(i >= 0){
            var c = $("#cpf").val();
            c = c.replace( /\D/g , "");
            c = c.replace( /(\d{3})(\d)/ , "$1.$2");
            c = c.replace( /(\d{3})(\d)/ , "$1.$2");
            c = c.replace( /(\d{3})(\d{1,2})$/ , "$1-$2");
            $("#cpf").val(c);
        }
    }
}

function checkCPF(cpf){
    var numeros, digitos, soma, i, resultado, digitos_iguais;
    digitos_iguais = 1;
    if(cpf.length < 11) return false;
    for(i = 0; i < cpf.length - 1; i++)
        if(cpf.charAt(i) != cpf.charAt(i + 1)){
            digitos_iguais = 0;
            break;
        }
    if(!digitos_iguais){
        numeros = cpf.substring(0,9);
        digitos = cpf.substring(9);
        soma = 0;
        for(i = 10; i > 1; i--)
            soma += numeros.charAt(10 - i) * i;
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if(resultado != digitos.charAt(0)) return false;
            numeros = cpf.substring(0,10);
            soma = 0;
            for(i = 11; i > 1; i--)
                soma += numeros.charAt(11 - i) * i;
                resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
                if(resultado != digitos.charAt(1)) return false;
        return true;
    }else return false;
}