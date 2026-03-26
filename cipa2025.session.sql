alter session set current_schema = tasy;

select table_name,
        column_name
  from all_tab_columns
 where 
 column_name like '%CD_CARGO%'
 and 
 table_name like '%%';


 SELECT * FROM CARGO;
 

select * from TASY_ASSINATURA_DIGITAL ORDER BY NR_SEQUENCIA DESC;

select 
   atc.table_name,
   atc.column_name,
   (select /*+ FIRST_ROWS(1) */ 
       t.column_value as example_value
      from table(xmlsequence(cursor(select atc.column_name 
                  from dual))) t
     where rownum = 1) as example_value
  from all_tab_columns atc
 where atc.column_name like '%HASH%'
   and exists (select 1 
         from all_tables at 
        where at.table_name = atc.table_name 
          and at.owner = 'TASY');

          SELECT * FROM PESSOA_FISICA_ASSINATURA WHERE CD_PESSOA_FISICA = 8118;

          SELECT * FROM TASY_ASSINAT_DIG_LOG;

          select 
          U.nm_usuario,
          U.ds_usuario,
          SA.ds_setor_atendimento,
          C.DS_CARGO
           from usuario u
           LEFT JOIN setor_atendimento sa
             ON u.cd_setor_atendimento = sa.cd_setor_atendimento
          LEFT JOIN pessoa_fisica pf
            ON u.cd_pessoa_fisica = pf.cd_pessoa_fisica
            LEFT JOIN cargo c
              ON pf.cd_cargo = c.cd_cargo
             where u.nm_usuario in ('HC3029');
                       
 SELECT CD_CARGO FROM PESSOA_FISICA;

     select 
          U.nm_usuario,
          U.ds_usuario
           from usuario u
           LEFT JOIN setor_atendimento sa
             ON u.cd_setor_atendimento = sa.cd_setor_atendimento

             where u.nm_usuario in ('hc1243','hc4251','hc2468','hc3822','hc130360','hc5569','HC2419','hc5198','hc072079','hc083720','hc3545','HC6075','hc3556','hc2027','hc4816','hc2862','HC3807','hc5567','hc108890','HC0084220','hc2924','hc5393','hc3761','HC4165','hc5893','hc8905','hc2246','hc6852','hc8981','hc8335','hc0100900','hc4052','hc8044','hc130838','hc103000','hc76856','hc7478','HC5850','hc2990','hc2864')           ;

select * from tasy_assinatura_digital;