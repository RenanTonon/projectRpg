## FEATURES

<h1>ROUTES</h1>
<h2>PERSONAGENS</h2>
<h3>controllers: 'personagens'<h3>
<p>MÉTODO: POST -> ' ' | ENTRADA: PersonagensDto | SAIDA: PersonagensDto | FUNCIONALIDADE: CADASTRAR UM PERSONAGEM</p>
<p>MÉTODO: GET  -> ' ' | ENTRADA: NULL | SAIDA: PersonagensDto[]  | FUNCIONALIDADE: LISTAR TODOS OS PERSONAGEM </p>
<p>MÉTODO: GET -> ':identificador' | ENTRADA: NULL | SAIDA: PersonagensDto | FUNCIONALIDADE: BUSCAR PERSONAGEM POR IDENTIFICADOR </p>
<p>MÉTODO: GET -> 'itens/:identificador' / | ENTRADA:NULL  | SAIDA: ItensMagicosDto[] | FUNCIONALIDADE: LISTA DE ITENS DO PERSONAGEM</p>
<p>MÉTODO: GET -> 'amuleto/:identificador' | ENTRADA: NULL | SAIDA: ItensMagicosDto  | FUNCIONALIDADE: BUSCAR AMULETO DO PERSONAGEM </p>
<p>MÉTODO: PATCH -> 'atualizatTudo/:identificador' | ENTRADA: PersonagensDto  | SAIDA: PersonagensDto | FUNCIONALIDADE: ATUALIZAR TODOS OS PARAMETROS DO PERSONAGEM</p>
<p>MÉTODO: PATCH -> 'atualiza-nome/:identificador'  | ENTRADA: PersonagensDto | SAIDA: PersonagensDto | FUNCIONALIDADE: ATUALIZA O NOME DE AVENTUREIRO DO PERSONAGEM </p>
<p>MÉTODO: PATCH -> 'adicionar-item/:identificador' | ENTRADA: ItensMagicosDto | SAIDA: PersonagensDto  | FUNCIONALIDADE: ADICIONA ITEM MÁGICO A LISTA DO PERSONAGEM </p>
<p>MÉTODO: DELETE -> ':identificador' | ENTRADA: NULL | SAIDA: NULL   | FUNCIONALIDADE: DELETA O PERSONAGEM  </p>
<p>MÉTODO: DELETE -> 'itens/:identificador' | ENTRADA: ItensMagicosDto  | SAIDA: ItensMagicosDto[]  | FUNCIONALIDADE: DELETA O ITEM MÁGICO COM O IDENTIFICADOR CORRESPONDENTE </p>
<h2>ITENS MÁGICOS</h2>
<h3>controllers: 'itens-magicos'<h3>
<p>MÉTODO: POST -> '' | ENTRADA: ItensMagicosDto  | SAIDA: ItensMagicosDto   | FUNCIONALIDADE: CADASTRAR UM ITEM MÁGICO  </p>
<p>MÉTODO: GET -> '' | ENTRADA: NULL   | SAIDA: ItensMagicosDto[]  | FUNCIONALIDADE: LISTA TODOS OS ITEM MÁGICOS  </p>
<p>MÉTODO: GET -> ':identificador' | ENTRADA: NULL  | SAIDA:  ItensMagicosDto | FUNCIONALIDADE: BUSCA UM ITEM MÁGICO ESPECIFICO </p>

