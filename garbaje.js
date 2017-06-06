tbody(bgcolor="cyan" )
    each item, i in items
        tr
             td= Enero
             td= '$'+item.seguridad
             td= item.limpieza
             td= item.luz
             td= item.tinacos
             td= item.pago
             td= item.mes
----------------------------------
                           
                            table(class="table table-striped"
            aling = 'center')
                thead(bgcolor="darkcyan")
                        tr 
                           th pruebA
                           tbody(bgcolor="cyan" )
                            each item, i in items
                            
                                td= 'mez'+item.mes 
                     
                   
                        each item, i in items
                             tbody(bgcolor="cyan" )
                                td= '$'+item.seguridad
                                td= item.limpieza
                                td= item.luz
                                td= item.tinacos
                                td= item.pago
                                td= item.mes

----------------------------------------
 table(border='1')
                    thead
                        each item, i in items
                                th= item.seguridad+"<---"
                                th Code
                                th Name
                                th Description
                                     tr
                       
                    tbody
                        