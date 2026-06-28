/* ═══ JC MEDICAL · BOT ═══ */
(function(){
'use strict';
const CATALOGO=[{"n": "Evaluación general", "c": "Evaluación", "v": [{"l": "", "p": "$15.000", "u": "https://micrositios.banchilepagos.cl/link/show?genid=4758&code=794dbecae66b205b49200816403d1b1fe745b6bd6d8ed8c655a2d33103032720&isQr=0"}]}, {"n": "Evaluación · tratamiento para arrugas", "c": "Evaluación", "v": [{"l": "", "p": "$15.000", "u": "https://micrositios.banchilepagos.cl/link/show?genid=4758&code=794dbecae66b205b49200816403d1b1fe745b6bd6d8ed8c655a2d33103032720&isQr=0"}]}, {"n": "Evaluación · tratamiento para la flacidez", "c": "Evaluación", "v": [{"l": "", "p": "$15.000", "u": "https://micrositios.banchilepagos.cl/link/show?genid=4758&code=794dbecae66b205b49200816403d1b1fe745b6bd6d8ed8c655a2d33103032720&isQr=0"}]}, {"n": "Botox 3 zonas", "c": "Toxina botulínica", "v": [{"l": "", "p": "$150.000", "u": "https://micrositios.banchilepagos.cl/link/show?genid=4716&code=5b0a3bf988aed3aeebb196ae0e968f558396b9913ec349afbf75203bebe09c70&isQr=0"}]}, {"n": "Botox tercio superior (4 zonas)", "c": "Toxina botulínica", "v": [{"l": "", "p": "$170.000", "u": "https://micrositios.banchilepagos.cl/link/show?genid=4717&code=a483ce9b34deb681fefb04c00f45e13e207d3f2817444b48b221afbf9dde8b10&isQr=0"}]}, {"n": "Botox Full Face (8 zonas)", "c": "Toxina botulínica", "v": [{"l": "", "p": "$350.000", "u": "https://micrositios.banchilepagos.cl/link/show?genid=4718&code=88de453e07ab2e6691381e9d99a594cc1e2a6c093f0d6b5daf92c50f942a9089&isQr=0"}]}, {"n": "Tratamiento de bruxismo con toxina botulínica", "c": "Toxina botulínica", "v": [{"l": "", "p": "$200.000", "u": "https://micrositios.banchilepagos.cl/link/show?genid=4719&code=870af6a734d26aa26a14ca209dfabd6389eadcb3415c60a533681fd81b8b7f10&isQr=0"}]}, {"n": "Hiperhidrosis axilar y palmar", "c": "Toxina botulínica", "v": [{"l": "", "p": "$200.000", "u": "https://micrositios.banchilepagos.cl/link/show?genid=4721&code=ac651a972070d58b9883c7b7cfe36be987f921cd441abbafb534caaa660d1396&isQr=0"}]}, {"n": "Hiperhidrosis facial", "c": "Toxina botulínica", "v": [{"l": "", "p": "$200.000", "u": "https://micrositios.banchilepagos.cl/link/show?genid=4722&code=4eb04d60fed2f3c4fd42e63e492ecd135417967f152479526511d8626e54e297&isQr=0"}]}, {"n": "Tratamiento sonrisa gingival", "c": "Toxina botulínica", "v": [{"l": "", "p": "$150.000", "u": "https://micrositios.banchilepagos.cl/link/show?genid=4725&code=12c80046649b721dc214ddb191bac99e5d03e02423847c5f2a20a6e0b7fe366f&isQr=0"}]}, {"n": "Mentón empedrado", "c": "Toxina botulínica", "v": [{"l": "", "p": "$150.000", "u": "https://micrositios.banchilepagos.cl/link/show?genid=4726&code=49e780701c7ac4fa09dae600140bb493181adce20c08ff1c38643a1f270d7d1e&isQr=0"}]}, {"n": "Rejuvenecimiento de cuello · Nefertiti", "c": "Toxina botulínica", "v": [{"l": "", "p": "$250.000", "u": "https://micrositios.banchilepagos.cl/link/show?genid=4727&code=ca7f658b01f57a97366c933592c4b59d9b6d59efd42734fb2e37fa653844be2c&isQr=0"}]}, {"n": "Código de barras, tratamiento de arrugas", "c": "Toxina botulínica", "v": [{"l": "", "p": "$120.000", "u": "https://micrositios.banchilepagos.cl/link/show?genid=4728&code=e612e7228fdb1afdeca668f1afc6b3575418e442dde0d4d2863282aca66161cd&isQr=0"}]}, {"n": "Rinomodelación", "c": "Ácido hialurónico", "v": [{"l": "", "p": "$170.000", "u": "https://micrositios.banchilepagos.cl/link/show?genid=4732&code=b60600e3e763935d472b9fbf109f256a773fc750682325b111748b68f5a175c4&isQr=0"}]}, {"n": "Proyección de mentón", "c": "Ácido hialurónico", "v": [{"l": "", "p": "$150.000", "u": "https://micrositios.banchilepagos.cl/link/show?genid=4733&code=550dd8b68b8e8a2536488710c7f7b3c0970a32f486c2dbaa7e471fadfe54f1c6&isQr=0"}]}, {"n": "Definición de arco mandibular", "c": "Ácido hialurónico", "v": [{"l": "", "p": "$200.000", "u": "https://micrositios.banchilepagos.cl/link/show?genid=4734&code=47d8ae86bd0b7aaf6520353dea9898313cf5864b34b1eda63e1dacf651fda801&isQr=0"}]}, {"n": "Realce de pómulos", "c": "Ácido hialurónico", "v": [{"l": "", "p": "$180.000", "u": "https://micrositios.banchilepagos.cl/link/show?genid=4735&code=bd5810f9a453b4a85caa168ff9f0a671dc66b7907bac6ab23b5a5aaf4f4dd03e&isQr=0"}]}, {"n": "Código de barras con ácido hialurónico", "c": "Ácido hialurónico", "v": [{"l": "", "p": "$150.000", "u": "https://micrositios.banchilepagos.cl/link/show?genid=4736&code=29da93b5c7d0e665c35609a5b3d1a42d242e472f2473a17acb82915969fb0b46&isQr=0"}]}, {"n": "Bioestimulación de colágeno facial", "c": "Bioestimulación de colágeno", "v": [{"l": "1 sesión — full face", "p": "$450.000", "u": "https://micrositios.banchilepagos.cl/link/show?genid=4729&code=f4181b98698ab711e70d388b511ccc4ac536bc4edb005e4cb85405472e1764e3&isQr=0"}, {"l": "Pack 3 sesiones", "p": "$1.200.000", "u": "https://micrositios.banchilepagos.cl/link/show?genid=4752&code=dcb4fbb3e925674e7ffe25d965be1e3573b8f53f8673c126e77754ba371a0be7&isQr=0"}]}, {"n": "Bioestimulación de manos", "c": "Bioestimulación de colágeno", "v": [{"l": "1 sesión", "p": "$450.000", "u": "https://micrositios.banchilepagos.cl/link/show?genid=4731&code=4c96a75fb0e541fe26b8baacc4835d62eaa93b0f7b6aad5aae284d61c5c6622a&isQr=0"}, {"l": "Pack 3 sesiones", "p": "$1.200.000", "u": "https://micrositios.banchilepagos.cl/link/show?genid=4750&code=049051967db336a83f63ca83b4ca84ca66b2614b8fda6044368ca7b01008b66e&isQr=0"}]}, {"n": "Bioestimulación de surcos nasogenianos y marionetas", "c": "Bioestimulación de colágeno", "v": [{"l": "1 sesión", "p": "$450.000", "u": "https://micrositios.banchilepagos.cl/link/show?genid=4746&code=346308b826290e552d7b1324bd3dd523743a7bcff9a07e115c0929efd9f03de3&isQr=0"}, {"l": "Pack 3 sesiones", "p": "$1.200.000", "u": "https://micrositios.banchilepagos.cl/link/show?genid=4751&code=ed6ed085b24902b92d08bb27538a741e465d952c7da47fcd3fc70fe16fd875c1&isQr=0"}]}, {"n": "Bioestimulación de cuello", "c": "Bioestimulación de colágeno", "v": [{"l": "1 sesión", "p": "$500.000", "u": "https://micrositios.banchilepagos.cl/link/show?genid=4748&code=e7c102c3c4b5927048ac7173dc1e1d8321b1fe2f62d3e7452df69ff8a97e5551&isQr=0"}, {"l": "Pack 3 sesiones", "p": "$1.450.000", "u": "https://micrositios.banchilepagos.cl/link/show?genid=4749&code=fd1552504db6007c177b004323b9cc9a4a6c5f35a4015a70e373e7ab4a924b81&isQr=0"}]}, {"n": "NCTF 135 HA", "c": "Regeneración", "v": [{"l": "1 sesión", "p": "$150.000", "u": "https://micrositios.banchilepagos.cl/link/show?genid=4737&code=abecb2b7ec484cee260bc735723bc1852a7ef523c07fbf53c21ed30a2d5c5b27&isQr=0"}, {"l": "Pack 3 sesiones", "p": "$420.000", "u": "https://micrositios.banchilepagos.cl/link/show?genid=4738&code=9659e8e529d8d63fdfe5f39d9371d100d9725c65e4847124d79039bc9b01f063&isQr=0"}]}, {"n": "ADN de salmón · Rejuran", "c": "Regeneración", "v": [{"l": "1 sesión", "p": "$180.000", "u": "https://micrositios.banchilepagos.cl/link/show?genid=4739&code=2e7b1f52991f03343e365152921d2189f2472f089578f019880800ae52744033&isQr=0"}, {"l": "Pack 3 sesiones", "p": "$500.000", "u": "https://micrositios.banchilepagos.cl/link/show?genid=4740&code=b19bb6f7cf70846320e420c6599adaf33f8795c08c67199bdee13c5d207efdf2&isQr=0"}]}, {"n": "Quemadores de grasa localizada", "c": "Corporal", "v": [{"l": "Pack 3 sesiones", "p": "$300.000", "u": "https://micrositios.banchilepagos.cl/link/show?genid=4741&code=6d5ae5e5044fe0928a1144dd52e018140e61fcb94b86171043fe96bc7d70e5b9&isQr=0"}, {"l": "Pack 6 sesiones", "p": "$550.000", "u": "https://micrositios.banchilepagos.cl/link/show?genid=4742&code=5d4f06c08609c3ef1fa8f2f9a66fbf265f0b60afd417d7c772d6964c9241c9f2&isQr=0"}]}];
var LOG='Estamos en <b>1 Poniente 1258, Edificio Plaza Poniente, Talca</b>, a media cuadra de la Plaza de Armas. Atendemos de <b>lunes a viernes de 10:30 a 19:00</b> y <b>sábados de 10:30 a 14:30</b> (domingo cerrado). Aceptamos débito, crédito y efectivo, y también pago en línea con Banco de Chile desde la sección Servicios.';
var NM={botox:'Bótox',bioestim:'Bioestimulación',salmon:'ADN de salmón',rino:'Rinomodelación',ha:'Ácido hialurónico',hiper:'Hiperhidrosis',meso:'Mesoterapia',lipo:'Lipolítico',exo:'Exosomas',pink:'Pink Glow'};
var KB={
 botox:{nm:'Bótox 3 zonas (marca Botox)',pk:'botox',syn:['botox','toxina','arruga','frente','entrecejo','patas de gallo','gesto','ceno'],
   que:'Relaja los músculos que marcan las arrugas de expresión en frente, entrecejo y patas de gallo, suavizándolas con un resultado natural. Incluye control y retoque.',
   sesion:'de unos 30 minutos.',
   efecto:'se nota de forma progresiva desde los 10 días aproximadamente y dura de 3 a 6 meses.',
   dolor:'muy tolerable: pequeños pinchazos rápidos. Se puede usar frío o anestesia tópica.',
   cuidados:'no masajear ni presionar la zona, evitar ejercicio intenso por 48 horas, no consumir alcohol en exceso, evitar sauna o calor intenso y no realizar tratamientos faciales. El resultado se nota progresivamente a partir de los 10 días.',
   sesiones:'1 sesión, con control y retoque al día 21. Luego mantención cada 4 a 6 meses.'},
 bioestim:{nm:'Bioestimulación de colágeno (Sculptra)',pk:'bioestim',syn:['bioestim','sculptra','colageno','flacidez','firmeza'],
   que:'Bioestimulador de colágeno ideal para mejorar la calidad de la piel de forma progresiva y natural: mejora la flacidez, restaura la firmeza y la textura, estimulando tu propio colágeno.',
   sesion:'de hasta 60 minutos cuando es completa.',
   efecto:'es progresivo y de larga duración, hasta 24 meses.',
   dolor:'tolerable, con anestesia tópica.',
   cuidados:'realizar masaje facial 5 veces al día, 5 minutos cada vez, durante 5 días; evitar ejercicio intenso el mismo día; evitar calor excesivo por 24 horas; mantener buena hidratación y no consumir antiinflamatorios por 7 días. Es normal una leve inflamación o sensibilidad los primeros 3 días.',
   sesiones:'entre 1 y 3 sesiones según tu nivel de flacidez.'},
 salmon:{nm:'ADN de salmón (polinucleótidos / Rejuran)',pk:'salmon',syn:['adn','salmon','rejuran','polinucleot'],
   que:'Regenera y mejora la calidad de la piel desde adentro: hidratación, textura y luminosidad.',
   sesion:'de unos 30 a 45 minutos.',
   efecto:'progresivo; los resultados se mantienen varios meses (aprox. 6) con mantención.',
   dolor:'tolerable, con anestesia tópica.',
   cuidados:'evitar maquillaje y sol directo las primeras 24 horas; mantener buena hidratación.',
   sesiones:'protocolo típico de 3 a 4 sesiones, cada 3 a 4 semanas.'},
 rino:{nm:'Rinomodelación',pk:'rinomodel',syn:['rinomodel','rinomodela','nariz','perfil nasal'],
   que:'Mejora el perfil y la proyección nasal sin cirugía, con resultados seguros y naturales. Incluye control y retoque.',
   sesion:'de aproximadamente 40 minutos, con anestesia para tu comodidad.',
   efecto:'es inmediato y dura hasta 12 meses aproximadamente.',
   dolor:'mínimo: se realiza con anestesia para tu comodidad.',
   cuidados:'durante las primeras 48 horas evitar presionar o masajear la nariz, dormir boca arriba idealmente, evitar lentes pesados y ejercicio intenso; además, evitar calor excesivo y no realizar tratamientos faciales por 3 días. Puede haber leve inflamación o sensibilidad inicial.',
   sesiones:'normalmente 1 sesión. Incluye control y retoque.'},
 ha:{nm:'Ácido hialurónico / armonización',pk:'acido hialur',syn:['hialur','relleno','labio','pomulo','armoniz','ojera','mandibul','menton','volumen'],
   que:'Da volumen y define contornos (labios, pómulos, mentón, mandíbula) de forma natural y reversible.',
   sesion:'de hasta 60 minutos cuando es una armonización completa.',
   efecto:'dura aproximadamente 6 a 18 meses según la zona y el producto.',
   dolor:'tolerable; se usa anestesia tópica y muchos productos incluyen lidocaína.',
   cuidados:'durante las primeras 48 horas evitar presionar o masajear la zona, evitar ejercicio intenso y calor excesivo, y no realizar tratamientos faciales por 3 días. Puede haber leve inflamación o sensibilidad inicial; puedes aplicar frío.',
   sesiones:'normalmente 1 sesión, con retoque opcional.'},
 hiper:{nm:'Hiperhidrosis (sudoración)',pk:'hiperhidrosis',syn:['hiperhidrosis','sudor','transpir'],
   que:'Reduce la sudoración excesiva (axilas, palmas o frente) con toxina botulínica.',
   sesion:'de unos 30 a 45 minutos.',
   efecto:'dura aproximadamente 4 a 9 meses.',
   dolor:'tolerable; se puede usar frío o anestesia tópica.',
   cuidados:'evitar ejercicio intenso y calor las primeras 24 horas.',
   sesiones:'normalmente 1 sesión, repetible por temporada.'},
 meso:{nm:'NCTF · mesoterapia facial',pk:'mesoterapia',syn:['nctf','mesoterapia','vitamina','biorevital','revitaliz'],
   que:'Aplicación de vitaminas y activos que mejoran hidratación, textura y luminosidad de la piel de forma progresiva.',
   sesion:'de unos 30 minutos.',
   efecto:'progresivo: la piel mejora durante los días siguientes.',
   dolor:'muy tolerable.',
   cuidados:'evitar maquillaje por 12 horas, ejercicio intenso el mismo día y sauna o calor por 24 horas; mantener buena hidratación. Puede haber leve enrojecimiento o pequeños puntos temporales tras la aplicación.',
   sesiones:'protocolo de 3 sesiones (NCTF), espaciadas cada 3 a 4 semanas.'},
 lipo:{nm:'Lipolítico inyectable',pk:'quemador',syn:['lipolitico','grasa localizada','quemador','papada','reduccion de grasa','grasa'],
   que:'Reduce la grasa localizada; los resultados son progresivos y se potencian con deporte y dieta.',
   sesion:'de unos 30 a 45 minutos.',
   efecto:'progresivo, potenciado con buenos hábitos.',
   dolor:'puede haber leve ardor o sensibilidad temporal en la zona.',
   cuidados:'mantener buena hidratación, evitar ejercicio intenso el mismo día, evitar alcohol por 24 horas y aplicar calor local en la zona. Es normal inflamación, sensibilidad o leve ardor temporal.',
   sesiones:'entre 3 y 6 sesiones según tu necesidad.'},
 exo:{nm:'Exosomas',pk:'exosoma',syn:['exosoma'],
   que:'Terapia regenerativa avanzada para calidad y luminosidad de la piel.',
   sesion:'de unos 30 minutos.',
   efecto:'progresivo; se potencia en protocolo de sesiones.',
   dolor:'tolerable, con anestesia tópica.',
   cuidados:'evitar sol y maquillaje las primeras horas.',
   sesiones:'suele indicarse en un plan de varias sesiones.'},
 pink:{nm:'Pink Glow',pk:'pink glow',syn:['pink glow'],
   que:'Aporta luminosidad e hidratación profunda a la piel.',
   sesion:'de unos 30 minutos.',
   efecto:'luminosidad inmediata/progresiva; ideal 5 a 7 días antes de un evento.',
   dolor:'muy tolerable.',
   cuidados:'evitar sol directo y maquillaje las primeras horas.',
   sesiones:'puede hacerse puntual o en plan de mantención.'}
};

/* ===== 100 PREGUNTAS FRECUENTES DE PACIENTES (FAQ base de conocimiento) ===== */
/* Cada entrada: k = palabras clave (sin tildes, minúsculas), a = respuesta, s = sugerencias. */
var JCM_FAQ=[
 // — Seguridad y generalidades —
 {k:['es seguro','son seguros','riesgo','riesgoso','peligroso','peligro'],a:'Sí. Trabajamos con productos certificados, técnica estéril y criterio clínico. Todo parte por una <b>evaluación</b> donde revisamos tu historia para confirmar que el tratamiento es seguro para ti.'},
 {k:['efectos secundarios','efectos adversos','reacciones','contraindicaciones','contraindicado'],a:'Los efectos suelen ser leves y temporales: enrojecimiento, leve hinchazón o pequeños moretones que desaparecen en pocos días. Las complicaciones serias son muy poco frecuentes cuando lo realiza un profesional con técnica adecuada.'},
 {k:['se puede revertir','reversible','se puede sacar','quitar el relleno','disolver'],a:'El ácido hialurónico es <b>reversible</b>: si fuese necesario, se puede disolver con una enzima (hialuronidasa). El bótox no se revierte, pero es temporal y desaparece solo en unos meses.'},
 {k:['es permanente','para siempre','dura para siempre','queda para siempre'],a:'No. La gran mayoría de los tratamientos estéticos inyectables son <b>temporales</b>: el bótox dura 3 a 6 meses y los rellenos de ácido hialurónico de 6 a 18 meses. Esto permite ajustar resultados con el tiempo.'},
 {k:['se nota','se ve falso','se ve raro','queda natural','natural','exagerado','artificial'],a:'Nuestra filosofía es el resultado <b>natural</b>: buscamos realzar tus rasgos y mantener tu expresión, no cambiar tu cara. Un buen trabajo es el que no se nota.'},
 {k:['reposo','tiempo de recuperacion','recuperacion','puedo trabajar','volver al trabajo','downtime','dias de reposo'],a:'La mayoría de los procedimientos <b>no requieren reposo</b>: puedes retomar tu día casi de inmediato. Solo se recomienda evitar ejercicio intenso, calor y masajes por 24 a 48 horas.'},
 {k:['hacer ejercicio','gimnasio','deporte','entrenar'],a:'Recomendamos evitar el ejercicio intenso las primeras 24 a 48 horas, porque el calor y el aumento de circulación pueden favorecer hinchazón o moretones.'},
 {k:['tomar alcohol','alcohol','carrete','copas'],a:'Mejor evitar el alcohol 24 horas antes y después: aumenta el riesgo de moretones e hinchazón. Después de ese periodo no hay problema.'},
 {k:['tomar sol','sol','playa','solarium','broncear'],a:'Evita el sol directo y el solarium las primeras 24 a 48 horas. Después, usa siempre protector solar: es el mejor aliado para mantener tus resultados.'},
 {k:['maquillarme','maquillaje','base','puedo maquillar'],a:'En general se recomienda no maquillar la zona tratada por unas 12 a 24 horas para cuidar los puntos de aplicación. Al día siguiente ya puedes maquillarte con normalidad.'},
 {k:['moreton','moretones','hematoma','morados','cardenal'],a:'Pueden aparecer pequeños moretones en el punto de punción; son temporales y se cubren con maquillaje. Para reducir el riesgo, evita alcohol, aspirina y ejercicio intenso antes del procedimiento.'},
 {k:['se hincha','hinchazon','inflamacion','inflamado','hinchada'],a:'Una leve hinchazón los primeros 1 a 3 días es normal, sobre todo en labios y ojeras. Baja sola; puedes aplicar frío local suave.'},
 {k:['antes de un evento','antes de mi matrimonio','antes de una fiesta','cuanto antes','evento importante','para un evento'],a:'Lo ideal es hacerlo con anticipación: <b>bótox</b> 2 a 3 semanas antes, <b>rellenos</b> al menos 2 semanas antes y un <b>Pink Glow</b> 5 a 7 días antes. Así llegas con todo asentado y luminoso.'},
 {k:['que edad','edad minima','desde que edad','soy muy joven','muy joven','tengo 18','tengo 19','tengo 20','tengo 21','a los 20','anos puedo','soy menor','menor de edad','edad para'],a:'Los tratamientos estéticos inyectables son para mayores de 18 años. La edad ideal depende de cada caso y objetivo; en la evaluación definimos qué tiene sentido para ti, incluyendo enfoques preventivos.'},
 {k:['hombres','para hombres','soy hombre','masculino'],a:'Por supuesto. Cada vez más hombres se tratan bótox, definición de mandíbula, ojeras o hiperhidrosis. El enfoque cuida los rasgos masculinos y un resultado natural.'},
 {k:['primera vez','primeriza','nunca me he hecho','primer tratamiento','soy nueva'],a:'¡Bienvenida! Para una primera vez lo mejor es partir por la <b>evaluación</b>: resolvemos tus dudas sin compromiso y te proponemos algo gradual y natural. Nada se hace sin que tú lo entiendas y lo decidas.'},
 {k:['miedo a las agujas','miedo a la aguja','me da miedo','panico','aguja me asusta','nerviosa'],a:'Es muy común. Usamos agujas muy finas, anestesia tópica o frío, y vamos a tu ritmo. La mayoría se sorprende de lo tolerable que resulta.'},
 {k:['acompanante','ir sola','puedo ir sola','necesito que me acompanen'],a:'No necesitas acompañante: son procedimientos ambulatorios y puedes irte sola sin problema. Si te deja más tranquila venir acompañada, también está perfecto.'},
 {k:['puedo manejar','conducir despues','manejar despues'],a:'Sí, puedes manejar después sin problema: no usamos sedación, solo anestesia local o tópica en la zona.'},
 {k:['anestesia','con anestesia','duele con anestesia','me duermen'],a:'Usamos <b>anestesia tópica</b> (crema) o frío local para tu comodidad, y muchos rellenos ya incluyen anestesia en su fórmula. No se usa anestesia general.'},

 // — Embarazo, lactancia y salud —
 {k:['embarazo','embarazada','estoy esperando','gestacion'],a:'Durante el <b>embarazo</b> no realizamos tratamientos inyectables por precaución. Podemos orientarte en skincare seguro y dejar tu plan listo para después.'},
 {k:['lactancia','amamantando','dando pecho','periodo de lactancia'],a:'En <b>lactancia</b> también recomendamos esperar con los inyectables. Conversémoslo en tu evaluación para planificar el mejor momento.'},
 {k:['enfermedad autoinmune','lupus','autoinmune','artritis','tiroides'],a:'Algunas condiciones autoinmunes requieren precaución. No es una contraindicación absoluta en todos los casos: lo evaluamos con tu historia clínica para decidir con seguridad.'},
 {k:['tengo diabetes','soy diabetica','con diabetes me','tengo hipertension','con hipertension','soy hipertenso','me puedo tratar si tengo'],a:'Tener diabetes o hipertensión controladas no impide la mayoría de los tratamientos estéticos, pero lo revisamos en tu evaluación para cuidar cada detalle.'},
 {k:['anticoagulante','aspirina','tomo aspirina','sintrom','medicamento para la sangre'],a:'Si tomas anticoagulantes o aspirina, avísanos: aumentan el riesgo de moretones. No siempre se suspenden; lo coordinamos con criterio clínico (y con tu médico tratante si corresponde).'},
 {k:['tomo medicamentos','medicamentos','pastillas','remedios'],a:'Cuéntanos qué medicamentos tomas en la evaluación. La mayoría son compatibles; solo algunos requieren precauciones que revisamos contigo.'},
 {k:['herpes','herpes labial','fuego labial'],a:'Si tienes herpes labial frecuente y vas a tratarte los labios, podemos indicar un antiviral preventivo para evitar un brote. Cuéntanoslo antes.'},
 {k:['con la regla','menstruacion','periodo','estoy con la regla'],a:'Puedes tratarte durante tu periodo sin problema. Algunas personas están un poco más sensibles esos días, nada más.'},
 {k:['fumar','fumo','cigarro','tabaco'],a:'Fumar no impide el tratamiento, pero afecta la calidad y regeneración de la piel, por lo que los resultados pueden durar menos. Reducirlo siempre suma.'},

 // — Combinaciones y plan —
 {k:['combinar','combinar tratamientos','botox y acido','varios tratamientos','mas de uno','juntos'],a:'Sí, muchos tratamientos se <b>combinan</b> (por ejemplo bótox + ácido hialurónico, o bioestimulador + skinbooster). En la evaluación armamos un plan ordenado y seguro según tus prioridades.'},
 {k:['cual me conviene','que me recomiendas','que es mejor para mi','que necesito','por donde empiezo','que me sirve mas'],a:'Eso lo definimos en tu <b>evaluación</b>: según tu piel, tus rasgos y tu objetivo te recomendamos lo que realmente te conviene, priorizando un resultado natural y tu presupuesto.'},
 {k:['cada cuanto','frecuencia','mantencion','cuando me retoco','cada cuanto tiempo'],a:'Depende del tratamiento: bótox cada 4 a 6 meses, rellenos cada 6 a 18 meses y bioestimulación en planes con mantención anual. Te dejamos un calendario claro.'},
 {k:['si dejo de hacerme','dejar el botox','se cae la cara','se pone peor','que pasa si no sigo','quedo peor'],a:'Mito frecuente: si dejas de hacerte bótox, tu cara <b>no empeora</b> ni se "cae". Simplemente vuelve poco a poco a como estaba antes; no genera dependencia ni deterioro.'},
 {k:['se acumula','tolerancia','resistencia al botox','deja de hacer efecto'],a:'El bótox no se "acumula". En algunos casos, con los años, puede generarse cierta resistencia; lo manejamos ajustando dosis y producto cuando corresponde.'},
 {k:['diferencia botox','botox o acido','botox vs','diferencia entre botox y','botox versus'],a:'<b>Bótox</b> relaja músculos para suavizar arrugas de expresión (frente, entrecejo, patas de gallo). El <b>ácido hialurónico</b> da volumen y define contornos (labios, pómulos, mentón). Suelen complementarse.'},
 {k:['relleno o bioestimulador','diferencia relleno','bioestimulador vs','relleno vs'],a:'El <b>relleno</b> da volumen inmediato en una zona. El <b>bioestimulador</b> (como Sculptra) no rellena: estimula tu propio colágeno para mejorar firmeza y calidad de piel de forma progresiva.'},
 {k:['armonizacion','armonizacion facial','armonizar','armonia facial'],a:'La <b>armonización facial</b> es un plan integral que equilibra los rasgos del rostro (mentón, mandíbula, pómulos, labios, nariz) con ácido hialurónico, buscando proporción y naturalidad, no cambiar tu identidad.'},
 {k:['skinbooster','skin booster','hidratacion profunda','piel hidratada'],a:'Los <b>skinboosters</b> son microinyecciones de ácido hialurónico que hidratan en profundidad y mejoran textura y luminosidad, sin dar volumen. Ideales para piel apagada o deshidratada.'},
 {k:['full face','cara completa','todo el rostro'],a:'"Full face" se refiere a tratar varias zonas del rostro en un plan completo (por ejemplo bótox de 8 zonas o una armonización integral). Lo diseñamos por etapas según tus prioridades.'},

 // — Zonas y motivos de consulta —
 {k:['labios','aumento de labios','rellenar labios','labios mas grandes','perfilado de labios'],a:'El <b>aumento de labios</b> con ácido hialurónico hidrata, define el borde y da volumen <b>natural y proporcionado</b>. Es reversible y la cantidad se gradúa contigo. Dura aproximadamente 8 a 12 meses.'},
 {k:['ojeras','ojera','surco lagrimal','ojos hundidos','mirada cansada'],a:'Las <b>ojeras</b> con surco marcado se tratan con ácido hialurónico para rellenar el hueco y descansar la mirada. Requiere técnica cuidadosa; lo evaluamos para ver si eres buena candidata.'},
 {k:['papada','doble menton','grasa en el cuello','papada inyectable'],a:'La <b>papada</b> se puede tratar con lipolítico inyectable (reduce grasa localizada de forma progresiva) y/o bioestimulación para firmeza. Definimos el plan según tu caso.'},
 {k:['surcos nasogenianos','bigote chino','lineas de la nariz a la boca','surco nasogeniano'],a:'Los <b>surcos nasogenianos</b> ("bigote chino") se suavizan con ácido hialurónico o bioestimulación, según su profundidad y la causa (volumen vs. flacidez).'},
 {k:['arrugas de la frente','lineas de la frente','frente arrugada','arrugas frente'],a:'Las <b>arrugas de la frente</b> son de expresión y responden muy bien al bótox, que relaja el músculo y las suaviza manteniendo un gesto natural.'},
 {k:['patas de gallo','arrugas de los ojos','arrugas al reir'],a:'Las <b>patas de gallo</b> (arrugas al sonreír) se tratan con bótox en dosis suaves, conservando una sonrisa natural.'},
 {k:['entrecejo','ceno','arruga del entrecejo','linea del enojo','gesto de enojo'],a:'La arruga del <b>entrecejo</b> es de las que mejor responde al bótox: suaviza el gesto de "enojo" y descansa la mirada.'},
 {k:['cuello','escote','arrugas del cuello','rejuvenecer cuello'],a:'El <b>cuello y escote</b> se pueden trabajar con bótox (técnica Nefertiti), bioestimulación y skinboosters para mejorar firmeza, líneas y textura.'},
 {k:['manos','rejuvenecer manos','manos envejecidas','venas de las manos'],a:'Las <b>manos</b> se rejuvenecen con bioestimulación de colágeno, que mejora volumen y calidad de piel, disimulando venas y tendones marcados.'},
 {k:['acne','espinillas','granos','piel con acne','cicatrices de acne','marcas de acne'],a:'Para <b>acné activo</b> priorizamos control médico y skincare; para <b>cicatrices y marcas</b> ayudan la regeneración (ADN de salmón, exosomas, NCTF) y bioestimulación. Lo definimos según tu piel.'},
 {k:['poros abiertos','poros dilatados','los poros','textura de la piel'],a:'Los <b>poros y la textura</b> mejoran con tratamientos de calidad de piel: mesoterapia, NCTF, ADN de salmón y skinboosters, junto a una buena rutina de skincare.'},
 {k:['manchas','melasma','pano','manchas en la cara','hiperpigmentacion'],a:'Las <b>manchas y melasma</b> se manejan con un plan que combina protección solar estricta, despigmentantes y tratamientos de piel. La evaluación define el más adecuado para tu tipo de mancha.'},
 {k:['rosacea','rojez','piel enrojecida','rojeces'],a:'La <b>rosácea</b> y las rojeces requieren un enfoque cuidadoso de calmar y fortalecer la piel. Te orientamos en rutina y tratamientos suaves; algunos casos requieren manejo dermatológico.'},
 {k:['flacidez','piel flacida','firmeza','piel caida','tono de la piel'],a:'La <b>flacidez</b> leve a moderada responde muy bien a la <b>bioestimulación de colágeno</b> (Sculptra), que mejora firmeza y estructura de forma progresiva y natural.'},
 {k:['parpado caido','parpados','ojo caido','ceja caida','levantar la ceja','mirada caida'],a:'Una <b>ceja o mirada caída</b> leve se puede mejorar con bótox bien dosificado para elevar sutilmente la cola de la ceja. Si la caída es marcada, lo evaluamos para ver qué es realista.'},
 {k:['menton','barbilla','proyeccion de menton','menton pequeno'],a:'El <b>mentón</b> se proyecta y armoniza con ácido hialurónico para equilibrar el perfil. También tratamos el "mentón empedrado" con bótox.'},
 {k:['pomulos','realce de pomulos','volumen en los pomulos','cachetes'],a:'El <b>realce de pómulos</b> con ácido hialurónico aporta soporte y definición al tercio medio del rostro, con un efecto lifting natural.'},

 // — Logística, pagos y agenda —
 {k:['cuanto dura la cita','cuanto demora la cita','tiempo de la consulta','cuanto me demoro'],a:'La evaluación dura unos 20 a 30 minutos; los procedimientos, entre 30 y 60 minutos según el tratamiento.'},
 {k:['cuotas','pagar en cuotas','financiamiento','en partes'],a:'Puedes pagar con débito, crédito y efectivo, y online con Banco de Chile. Para opciones de cuotas, pregúntanos por WhatsApp y te confirmamos las alternativas vigentes.'},
 {k:['boleta','factura','comprobante'],a:'Sí, emitimos comprobante de tus pagos. Si necesitas un detalle especial, indícalo al momento de pagar.'},
 {k:['isapre','fonasa','bono','reembolso','prevision','seguro de salud'],a:'Los tratamientos estéticos no se cubren por Isapre/Fonasa al ser de carácter estético. Te entregamos comprobante por si tu seguro complementario lo considera.'},
 {k:['agendar online','reservar online','reserva por internet','agendar por internet'],a:'Puedes coordinar tu hora por WhatsApp con el botón verde, o pagar tu evaluación online desde la sección <b>Servicios</b> y luego agendamos tu horario.'},
 {k:['domicilio','a domicilio','van a mi casa','atienden en casa'],a:'Por seguridad y esterilidad, atendemos solo en la clínica en Talca, no a domicilio.'},
 {k:['evaluacion obligatoria','tengo que evaluarme','es obligatorio evaluar','sin evaluacion'],a:'Sí: toda intervención parte por una <b>evaluación</b>. Es lo que nos permite recomendarte con seguridad y lograr un resultado natural y a tu medida.'},
 {k:['evaluacion se descuenta','descuento evaluacion','la evaluacion se paga','cuesta la evaluacion','vale la evaluacion'],a:'La evaluación cuesta $15.000 y se <b>descuenta del tratamiento</b> si decides realizarlo. Es una inversión que evita gastos innecesarios.'},
 {k:['solo preguntar','solo consultar','ir a preguntar','sin compromiso','cotizar'],a:'¡Claro! Puedes escribirnos todas tus dudas por aquí o por WhatsApp sin compromiso. Cuando quieras algo personalizado y seguro, agendas tu evaluación.'},
 {k:['estacionamiento','donde estaciono','parking'],a:'Estamos en pleno centro de Talca (1 Poniente 1258, Edificio Plaza Poniente), con estacionamientos públicos cercanos a pocos metros.'},

 // — Resultados y expectativas —
 {k:['si no me gusta','no me gusta el resultado','no quedo conforme','y si no funciona','garantia'],a:'Trabajamos de forma gradual y conversada para que te sientas cómoda. Con ácido hialurónico, además, el resultado es ajustable e incluso reversible. Tu evaluación incluye expectativas realistas.'},
 {k:['cuanto dura el resultado','cuanto me dura','duracion del resultado','cuanto tiempo dura'],a:'Aproximado: bótox 3 a 6 meses, ácido hialurónico 6 a 18 meses, bioestimulación hasta 24 meses, ADN de salmón ~6 meses con mantención. Varía según tu metabolismo y la zona.'},
 {k:['rejuvenecer','verme mas joven','antiedad','envejecimiento','verme mejor'],a:'El antienvejecimiento se aborda en capas: prevención con bótox, soporte con bioestimulación y rellenos, y calidad de piel con regeneración y skincare. En la evaluación armamos tu plan según tu edad y objetivo.'},
 {k:['exosomas','exosoma'],a:'Los <b>exosomas</b> son terapia regenerativa avanzada que mejora calidad, luminosidad y reparación de la piel. Suelen indicarse en protocolo de varias sesiones y combinan muy bien con otros tratamientos.'},
 {k:['que es la bioestimulacion','bioestimulacion','sculptra','colageno propio'],a:'La <b>bioestimulación</b> (Sculptra, ácido poli-L-láctico) no rellena: estimula tu propio colágeno para mejorar firmeza, textura y flacidez de forma progresiva y natural, con resultados de larga duración.'}
];

function _faqScore(q){
  var best=null,bs=0;
  for(var i=0;i<JCM_FAQ.length;i++){var f=JCM_FAQ[i],sc=0;
    for(var j=0;j<f.k.length;j++){if(q.indexOf(f.k[j])>=0){sc+=f.k[j].split(' ').length;}}
    if(sc>bs){bs=sc;best=f;}}
  return bs>0?best:null;
}


/* ===== BASE DE CONOCIMIENTO: 100 enfermedades más prevalentes en Chile =====
   Información educativa con cita a fuente reputada. NO reemplaza consulta médica.
   Fuentes: MedlinePlus en español (NIH), MINSAL Chile, OPS/OMS. */
var JCM_DX_SRC={
  mp:{n:'MedlinePlus en español (NIH)',u:'https://medlineplus.gov/spanish/'},
  ms:{n:'MINSAL — Ministerio de Salud de Chile',u:'https://www.minsal.cl/'},
  ops:{n:'OPS/OMS',u:'https://www.paho.org/es/chile'}
};
var JCM_DISEASES=[
 // Cardiometabólicas
 {k:['hipertension','presion alta','presion arterial alta'],n:'Hipertensión arterial',a:'Presión arterial persistentemente elevada. Suele no dar síntomas, por lo que se le llama "asesino silencioso"; aumenta el riesgo de infarto y ACV. Se controla con estilo de vida y, si corresponde, medicamentos.',s:'mp'},
 {k:['diabetes tipo 2','diabetes 2','azucar alta','diabetes mellitus','diabetes','que es la diabetes'],n:'Diabetes tipo 2',a:'Enfermedad crónica en que el cuerpo no usa bien la insulina y sube la glucosa en sangre. Muy prevalente en Chile; se maneja con alimentación, actividad física y fármacos.',s:'mp'},
 {k:['diabetes tipo 1','diabetes juvenil'],n:'Diabetes tipo 1',a:'El páncreas produce poca o nada de insulina; requiere insulina de por vida. Suele aparecer en niños y jóvenes.',s:'mp'},
 {k:['colesterol alto','dislipidemia','trigliceridos','colesterol'],n:'Dislipidemia (colesterol alto)',a:'Niveles elevados de colesterol o triglicéridos que favorecen la formación de placas en las arterias. Se mejora con dieta, ejercicio y a veces estatinas.',s:'mp'},
 {k:['obesidad','sobrepeso','exceso de peso','bajar de peso'],n:'Obesidad y sobrepeso',a:'Exceso de grasa corporal que aumenta el riesgo de diabetes, hipertensión y problemas articulares. Chile tiene una de las prevalencias más altas de la región.',s:'ms'},
 {k:['sindrome metabolico'],n:'Síndrome metabólico',a:'Conjunto de factores (obesidad abdominal, presión alta, azúcar y lípidos elevados) que juntos elevan mucho el riesgo cardiovascular.',s:'mp'},
 {k:['infarto','enfermedad coronaria','ataque al corazon','angina'],n:'Enfermedad coronaria / infarto',a:'Obstrucción de las arterias del corazón. El infarto es una urgencia: dolor opresivo en el pecho, sudoración y falta de aire. Llama a emergencias de inmediato.',s:'mp'},
 {k:['acv','ataque cerebral','derrame','accidente cerebrovascular','trombosis cerebral'],n:'Accidente cerebrovascular (ACV)',a:'Interrupción del flujo de sangre al cerebro. Señales: cara caída, debilidad en un brazo, dificultad para hablar. Es una urgencia: actúa rápido.',s:'mp'},
 {k:['insuficiencia cardiaca'],n:'Insuficiencia cardíaca',a:'El corazón no bombea con suficiente fuerza; causa cansancio, hinchazón de piernas y falta de aire. Requiere control médico continuo.',s:'mp'},
 {k:['arritmia','fibrilacion auricular','palpitaciones'],n:'Arritmia / fibrilación auricular',a:'Latido irregular del corazón. La fibrilación auricular aumenta el riesgo de ACV y suele requerir tratamiento.',s:'mp'},
 {k:['anemia','falta de hierro','hemoglobina baja'],n:'Anemia',a:'Disminución de glóbulos rojos o hemoglobina; causa cansancio y palidez. La más común es por falta de hierro.',s:'mp'},
 // Respiratorias
 {k:['resfrio','resfriado','rinovirus'],n:'Resfrío común',a:'Infección viral leve de las vías respiratorias altas: congestión, estornudos y dolor de garganta. Mejora solo en una semana.',s:'mp'},
 {k:['influenza','gripe'],n:'Influenza (gripe)',a:'Infección viral respiratoria con fiebre, dolores musculares y tos. La vacuna anual es la mejor prevención, sobre todo en grupos de riesgo.',s:'ms'},
 {k:['neumonia','pulmonia'],n:'Neumonía',a:'Infección del pulmón con fiebre, tos y dificultad para respirar. Puede ser grave en adultos mayores y niños; requiere evaluación médica.',s:'mp'},
 {k:['asma'],n:'Asma',a:'Enfermedad crónica que inflama y estrecha las vías respiratorias, causando ahogo, tos y silbidos. Se controla con inhaladores.',s:'mp'},
 {k:['epoc','enfermedad pulmonar obstructiva'],n:'EPOC',a:'Daño pulmonar progresivo, principalmente por tabaquismo, que dificulta respirar. Dejar de fumar es clave.',s:'mp'},
 {k:['bronquitis'],n:'Bronquitis',a:'Inflamación de los bronquios con tos y flema. La aguda suele ser viral; la crónica se asocia al tabaco.',s:'mp'},
 {k:['covid','coronavirus','covid-19'],n:'COVID-19',a:'Enfermedad respiratoria por el virus SARS-CoV-2. Síntomas variables; la vacunación y medidas reducen casos graves.',s:'ms'},
 {k:['rinitis alergica','alergia nasal','rinitis'],n:'Rinitis alérgica',a:'Inflamación nasal por alérgenos (polen, ácaros): estornudos, congestión y picazón. Se maneja con antihistamínicos y evitando el alérgeno.',s:'mp'},
 {k:['sinusitis'],n:'Sinusitis',a:'Inflamación de los senos paranasales con congestión, dolor facial y secreción. Puede ser viral o bacteriana.',s:'mp'},
 {k:['tuberculosis','tbc'],n:'Tuberculosis',a:'Infección bacteriana que afecta sobre todo los pulmones: tos prolongada, baja de peso y sudoración nocturna. Tiene tratamiento gratuito en Chile.',s:'ms'},
 // Salud mental
 {k:['depresion','deprimido','tristeza profunda'],n:'Depresión',a:'Trastorno del ánimo con tristeza persistente, pérdida de interés y fatiga. Es tratable con apoyo psicológico y/o médico. Si tienes pensamientos de hacerte daño, busca ayuda ya (Salud Responde 600 360 7777).',s:'ms'},
 {k:['ansiedad','crisis de panico','angustia','ataque de panico'],n:'Trastornos de ansiedad',a:'Preocupación o miedo intensos y persistentes que afectan la vida diaria. Responden bien a psicoterapia y, a veces, medicación.',s:'mp'},
 {k:['trastorno bipolar','bipolaridad'],n:'Trastorno bipolar',a:'Alterna episodios de ánimo elevado (manía) y depresivo. Requiere tratamiento y seguimiento especializado.',s:'mp'},
 {k:['esquizofrenia'],n:'Esquizofrenia',a:'Trastorno mental grave que altera el pensamiento y la percepción. Con tratamiento adecuado muchas personas llevan una vida funcional.',s:'mp'},
 {k:['demencia','alzheimer','perdida de memoria'],n:'Demencia / Alzheimer',a:'Deterioro progresivo de memoria y funciones mentales. El Alzheimer es la causa más frecuente; el diagnóstico temprano ayuda.',s:'mp'},
 {k:['insomnio','no puedo dormir','problemas para dormir'],n:'Insomnio',a:'Dificultad para conciliar o mantener el sueño. Mejora con higiene del sueño; si persiste, consulta.',s:'mp'},
 {k:['estres','estresado'],n:'Estrés',a:'Respuesta del cuerpo a demandas excesivas. Mantenido en el tiempo afecta la salud física y mental.',s:'mp'},
 {k:['alcoholismo','consumo de alcohol','dependencia alcohol'],n:'Trastorno por consumo de alcohol',a:'Consumo problemático que daña la salud y la vida diaria. Existe tratamiento y apoyo disponible.',s:'ms'},
 {k:['tabaquismo','adiccion al cigarro','dejar de fumar','fumador'],n:'Tabaquismo',a:'Dependencia a la nicotina; principal causa evitable de enfermedad. Dejar de fumar mejora la salud a cualquier edad.',s:'ms'},
 {k:['tdah','deficit atencional','hiperactividad'],n:'TDAH',a:'Trastorno del neurodesarrollo con inatención e impulsividad. Se maneja con apoyo conductual y, si corresponde, fármacos.',s:'mp'},
 // Cáncer
 {k:['cancer gastrico','cancer de estomago','cancer al estomago'],n:'Cáncer gástrico (estómago)',a:'Uno de los cánceres más frecuentes y mortales en Chile. La detección temprana (endoscopía ante síntomas de alarma) mejora el pronóstico.',s:'ms'},
 {k:['cancer de mama','cancer mamario','tumor en la mama'],n:'Cáncer de mama',a:'El cáncer más frecuente en mujeres. La mamografía periódica permite detectarlo temprano. Está cubierto por GES.',s:'ms'},
 {k:['cancer de prostata'],n:'Cáncer de próstata',a:'Cáncer frecuente en hombres mayores. El control con APE y examen permite detección oportuna.',s:'mp'},
 {k:['cancer colorrectal','cancer de colon','cancer al colon'],n:'Cáncer colorrectal',a:'Cáncer de colon o recto. El tamizaje (test de sangre oculta, colonoscopía) lo detecta temprano y es muy tratable.',s:'mp'},
 {k:['cancer de pulmon','cancer al pulmon'],n:'Cáncer de pulmón',a:'Fuertemente asociado al tabaco. Tos persistente o sangre al toser deben evaluarse.',s:'mp'},
 {k:['cancer cervicouterino','cancer de cuello uterino','cancer al utero'],n:'Cáncer cervicouterino',a:'Causado por el VPH. Prevenible con vacuna y detectable con el PAP. Cubierto por GES.',s:'ms'},
 {k:['cancer de vesicula','cancer vesicula biliar'],n:'Cáncer de vesícula biliar',a:'Chile tiene una de las tasas más altas del mundo, ligado a cálculos biliares. La cirugía de vesícula en casos indicados previene.',s:'ms'},
 {k:['cancer de piel','melanoma','lunar maligno'],n:'Cáncer de piel / melanoma',a:'Relacionado con la exposición solar. Vigila lunares que cambian de tamaño, color o forma. La protección solar es clave en prevención.',s:'mp'},
 {k:['leucemia','cancer a la sangre'],n:'Leucemia',a:'Cáncer de las células sanguíneas. Puede causar cansancio, moretones e infecciones frecuentes.',s:'mp'},
 {k:['linfoma'],n:'Linfoma',a:'Cáncer del sistema linfático; suele manifestarse con ganglios aumentados, fiebre y baja de peso.',s:'mp'},
 // Digestivas
 {k:['gastritis'],n:'Gastritis',a:'Inflamación del revestimiento del estómago con ardor y malestar. Se asocia a H. pylori, antiinflamatorios y estrés.',s:'mp'},
 {k:['ulcera','ulcera peptica','ulcera gastrica'],n:'Úlcera péptica',a:'Lesión en el estómago o duodeno, frecuentemente por H. pylori. Causa dolor que mejora o empeora con las comidas.',s:'mp'},
 {k:['reflujo','erge','acidez','agrieras'],n:'Reflujo gastroesofágico (ERGE)',a:'El contenido del estómago sube al esófago causando acidez y ardor. Mejora con cambios de hábito y fármacos.',s:'mp'},
 {k:['calculos en la vesicula','colelitiasis','calculos biliares','piedras vesicula'],n:'Cálculos biliares (colelitiasis)',a:'Muy frecuentes en Chile. Pueden no dar síntomas o causar cólicos; aumentan el riesgo de cáncer de vesícula.',s:'mp'},
 {k:['higado graso','esteatosis'],n:'Hígado graso',a:'Acumulación de grasa en el hígado, ligada a obesidad y diabetes. Mejora con baja de peso y actividad física.',s:'mp'},
 {k:['cirrosis'],n:'Cirrosis',a:'Daño hepático crónico e irreversible, por alcohol, hígado graso o hepatitis. Requiere manejo especializado.',s:'mp'},
 {k:['hepatitis'],n:'Hepatitis viral',a:'Inflamación del hígado por virus (A, B, C). Las hepatitis B y C pueden cronificarse; existen vacunas (A y B) y tratamiento.',s:'mp'},
 {k:['colon irritable','intestino irritable','sii'],n:'Síndrome de intestino irritable',a:'Trastorno funcional con dolor abdominal, distensión y cambios en el tránsito. Se maneja con dieta y manejo del estrés.',s:'mp'},
 {k:['estrenimiento','constipacion'],n:'Estreñimiento',a:'Evacuaciones poco frecuentes o difíciles. Mejora con fibra, agua y actividad física.',s:'mp'},
 {k:['hemorroides'],n:'Hemorroides',a:'Venas dilatadas en el ano/recto que causan dolor o sangrado. Se alivian con fibra, higiene y, si es necesario, tratamiento.',s:'mp'},
 {k:['enfermedad celiaca','celiaco','intolerancia al gluten'],n:'Enfermedad celíaca',a:'Reacción inmune al gluten que daña el intestino. El tratamiento es una dieta sin gluten de por vida.',s:'mp'},
 {k:['diverticulos','diverticulosis','diverticulitis'],n:'Enfermedad diverticular',a:'Pequeñas bolsas en el colon; si se inflaman (diverticulitis) causan dolor y fiebre. La fibra ayuda a prevenir.',s:'mp'},
 // Musculoesqueléticas
 {k:['artrosis','osteoartritis','desgaste articular'],n:'Artrosis (osteoartritis)',a:'Desgaste del cartílago articular con dolor y rigidez, frecuente en rodillas y manos. El ejercicio y el control de peso ayudan.',s:'mp'},
 {k:['artritis reumatoide'],n:'Artritis reumatoide',a:'Enfermedad autoinmune que inflama las articulaciones. El tratamiento temprano evita daño articular.',s:'mp'},
 {k:['osteoporosis','huesos debiles'],n:'Osteoporosis',a:'Disminución de la densidad ósea que aumenta el riesgo de fracturas, sobre todo tras la menopausia. Calcio, vitamina D y ejercicio ayudan.',s:'mp'},
 {k:['lumbago','dolor lumbar','dolor de espalda baja','dolor de espalda'],n:'Lumbago (dolor lumbar)',a:'Dolor en la zona baja de la espalda, muy común. La mayoría mejora con movimiento y manejo del dolor.',s:'mp'},
 {k:['cervicalgia','dolor de cuello'],n:'Cervicalgia (dolor de cuello)',a:'Dolor y rigidez del cuello, a menudo por mala postura o tensión. Mejora con ejercicios y ergonomía.',s:'mp'},
 {k:['gota','acido urico'],n:'Gota',a:'Artritis por acumulación de ácido úrico; causa ataques de dolor intenso, típicamente en el dedo gordo del pie. Se controla con dieta y fármacos.',s:'mp'},
 {k:['fibromialgia'],n:'Fibromialgia',a:'Dolor muscular generalizado, fatiga y trastornos del sueño. Mejora con ejercicio suave y manejo multidisciplinario.',s:'mp'},
 {k:['tendinitis'],n:'Tendinitis',a:'Inflamación de un tendón por sobreuso. Reposo relativo, frío y fortalecimiento ayudan a recuperarse.',s:'mp'},
 {k:['escoliosis'],n:'Escoliosis',a:'Curvatura lateral de la columna. Las leves se observan; las mayores pueden requerir corsé o cirugía.',s:'mp'},
 // Renales / urinarias
 {k:['infeccion urinaria','itu','cistitis','infeccion a la orina'],n:'Infección urinaria (ITU)',a:'Infección de la vejiga o vías urinarias con ardor al orinar y urgencia. Frecuente en mujeres; se trata con antibióticos.',s:'mp'},
 {k:['calculos renales','calculos al rinon','litiasis renal','piedras en el rinon'],n:'Cálculos renales',a:'Piedras en el riñón o vías urinarias que causan dolor intenso (cólico renal). Beber agua y evaluación médica son clave.',s:'mp'},
 {k:['enfermedad renal cronica','insuficiencia renal','falla renal'],n:'Enfermedad renal crónica',a:'Pérdida progresiva de la función renal, a menudo por diabetes e hipertensión. El control temprano enlentece su avance.',s:'mp'},
 {k:['prostata grande','hiperplasia prostatica','hpb','agrandamiento de prostata'],n:'Hiperplasia prostática benigna',a:'Aumento no canceroso de la próstata en hombres mayores; dificulta orinar. Tiene tratamiento eficaz.',s:'mp'},
 {k:['incontinencia urinaria','perdida de orina','se me escapa la orina'],n:'Incontinencia urinaria',a:'Pérdida involuntaria de orina. Hay tratamientos según el tipo (ejercicios, fármacos, cirugía).',s:'mp'},
 {k:['prostatitis'],n:'Prostatitis',a:'Inflamación de la próstata con dolor pélvico y molestias al orinar. Puede ser infecciosa.',s:'mp'},
 // Endocrinas
 {k:['hipotiroidismo','tiroides lenta'],n:'Hipotiroidismo',a:'La tiroides produce poca hormona: cansancio, aumento de peso y frío. Se trata con hormona tiroidea.',s:'mp'},
 {k:['hipertiroidismo','tiroides acelerada'],n:'Hipertiroidismo',a:'Exceso de hormona tiroidea: nerviosismo, baja de peso y palpitaciones. Requiere tratamiento médico.',s:'mp'},
 {k:['bocio'],n:'Bocio',a:'Aumento de tamaño de la tiroides. Puede asociarse a déficit de yodo o a enfermedad tiroidea.',s:'mp'},
 {k:['nodulo tiroideo','nodulo en la tiroides'],n:'Nódulo tiroideo',a:'Bulto en la tiroides, generalmente benigno. Se evalúa con ecografía y, si es necesario, punción.',s:'mp'},
 {k:['ovario poliquistico','sop','sindrome de ovario poliquistico'],n:'Síndrome de ovario poliquístico (SOP)',a:'Desequilibrio hormonal con ciclos irregulares, acné y vello. Se maneja con estilo de vida y tratamiento médico.',s:'mp'},
 // Neurológicas
 {k:['migrana','jaqueca','cefalea','dolor de cabeza'],n:'Migraña / cefalea',a:'Dolor de cabeza intenso, a veces con náuseas y sensibilidad a la luz. Hay tratamientos para la crisis y para prevenir.',s:'mp'},
 {k:['epilepsia','convulsiones'],n:'Epilepsia',a:'Trastorno con crisis convulsivas recurrentes. La mayoría se controla bien con medicación.',s:'mp'},
 {k:['parkinson'],n:'Enfermedad de Parkinson',a:'Trastorno neurodegenerativo con temblor, rigidez y lentitud de movimientos. El tratamiento mejora los síntomas.',s:'mp'},
 {k:['neuropatia','hormigueo','adormecimiento'],n:'Neuropatía periférica',a:'Daño a los nervios con hormigueo, dolor o adormecimiento, frecuente en diabetes. El control de la causa ayuda.',s:'mp'},
 {k:['vertigo','mareos','mareo'],n:'Vértigo / mareo',a:'Sensación de giro o inestabilidad, a menudo de origen del oído interno. Suele ser benigno y tratable.',s:'mp'},
 {k:['esclerosis multiple'],n:'Esclerosis múltiple',a:'Enfermedad autoinmune que afecta el sistema nervioso central. El tratamiento moderno reduce las recaídas.',s:'mp'},
 // Infecciosas / ITS
 {k:['vih','sida'],n:'VIH / SIDA',a:'Virus que afecta el sistema inmune. Con tratamiento antirretroviral la persona vive sana y no transmite. El test es gratuito y confidencial.',s:'ms'},
 {k:['sifilis'],n:'Sífilis',a:'Infección de transmisión sexual bacteriana, curable con antibióticos. La detección temprana evita complicaciones.',s:'mp'},
 {k:['gonorrea'],n:'Gonorrea',a:'ITS bacteriana con secreción y ardor al orinar. Se trata con antibióticos; usa preservativo para prevenir.',s:'mp'},
 {k:['vph','virus del papiloma','papiloma','verrugas genitales'],n:'Virus del papiloma humano (VPH)',a:'ITS muy frecuente; algunos tipos causan verrugas y otros cáncer cervicouterino. La vacuna previene.',s:'ms'},
 {k:['herpes','herpes labial','herpes genital'],n:'Herpes',a:'Infección viral que causa ampollas (labiales o genitales). No tiene cura, pero los antivirales controlan los brotes.',s:'mp'},
 {k:['hantavirus','hanta'],n:'Hantavirus',a:'Enfermedad grave transmitida por ratones silvestres, presente en zonas rurales de Chile. Ventilar y evitar contacto con roedores previene.',s:'ms'},
 {k:['parasitos','parasitosis','lombrices','giardia'],n:'Parasitosis intestinal',a:'Infección por parásitos con dolor abdominal y diarrea. Buena higiene y agua segura previenen; tiene tratamiento.',s:'mp'},
 // Oftalmológicas
 {k:['miopia','no veo de lejos'],n:'Miopía',a:'Defecto visual en que se ve borroso de lejos. Se corrige con lentes, lentillas o cirugía.',s:'mp'},
 {k:['cataratas'],n:'Cataratas',a:'Opacidad del cristalino que nubla la visión, frecuente con la edad. La cirugía la resuelve eficazmente.',s:'mp'},
 {k:['glaucoma'],n:'Glaucoma',a:'Daño del nervio óptico, a menudo por presión ocular alta; puede causar ceguera si no se trata. El control oftalmológico es clave.',s:'mp'},
 {k:['conjuntivitis','ojo rojo'],n:'Conjuntivitis',a:'Inflamación de la conjuntiva con ojo rojo y secreción. Puede ser viral, bacteriana o alérgica.',s:'mp'},
 // Dermatológicas
 {k:['acne','espinillas','granos'],n:'Acné',a:'Obstrucción e inflamación de los folículos con granos y espinillas. Tiene tratamiento médico y dermocosmético eficaz.',s:'mp'},
 {k:['dermatitis atopica','eczema','eccema'],n:'Dermatitis atópica (eczema)',a:'Piel seca, roja y con picazón, frecuente en niños. Se controla con hidratación y tratamiento de los brotes.',s:'mp'},
 {k:['psoriasis'],n:'Psoriasis',a:'Enfermedad inflamatoria crónica con placas escamosas. No es contagiosa y tiene varios tratamientos.',s:'mp'},
 {k:['rosacea'],n:'Rosácea',a:'Enrojecimiento facial persistente con granitos, frecuente en piel clara. Se controla con cuidados y tratamiento médico.',s:'mp'},
 {k:['melasma','manchas en la cara','pano','hiperpigmentacion'],n:'Melasma (manchas)',a:'Manchas oscuras en el rostro, ligadas a sol y hormonas. La protección solar estricta es esencial en el manejo.',s:'mp'},
 {k:['vitiligo','manchas blancas'],n:'Vitíligo',a:'Pérdida de pigmento que deja manchas blancas en la piel. Existen tratamientos para estimular la repigmentación.',s:'mp'},
 {k:['urticaria','ronchas','alergia en la piel'],n:'Urticaria',a:'Ronchas que pican, por reacción alérgica o de otra causa. Suele ceder con antihistamínicos.',s:'mp'},
 {k:['dermatitis seborreica','caspa'],n:'Dermatitis seborreica',a:'Descamación y enrojecimiento en cuero cabelludo y cara (caspa). Es crónica pero se controla bien.',s:'mp'},
 // Ginecológica / etapa vital
 {k:['menopausia','climaterio','bochornos'],n:'Menopausia',a:'Fin de los ciclos menstruales con cambios hormonales (bochornos, cambios de ánimo). Hay medidas y tratamientos para los síntomas.',s:'mp'},
 {k:['varices','venas varicosas','venas en las piernas','aranitas'],n:'Várices',a:'Venas dilatadas y tortuosas, sobre todo en las piernas, por falla de las válvulas venosas. Muy frecuentes; mejoran con medidas y, si es necesario, tratamiento.',s:'mp'}
];
function _dxScore(q){
  var best=null,bs=0;
  for(var i=0;i<JCM_DISEASES.length;i++){var d=JCM_DISEASES[i],sc=0;
    for(var j=0;j<d.k.length;j++){if(q.indexOf(d.k[j])>=0){sc+=d.k[j].split(' ').length;}}
    if(sc>bs){bs=sc;best=d;}}
  return bs>0?best:null;
}
function _dxAnswer(d){
  var s=JCM_DX_SRC[d.s];
  return {html:('<b>'+d.n+'</b><br>'+d.a+
    '<br><br><span style="font-size:11.5px;opacity:.6;line-height:1.5">Fuente: <a href="'+s.u+'" target="_blank" rel="noopener" style="color:#8B9EB0">'+s.n+'</a><br>Información educativa; <b>no reemplaza el diagnóstico de un profesional</b>. En JC Medical somos medicina estética facial: para tu salud general, consulta a tu médico o llama a Salud Responde 600 360 7777.</span>'),
    sugs:['¿Qué es el Bótox?','¿En qué consiste la evaluación?','Precios']};
}
var JCM_COND=[
 {c:'sangrado',   k:['anticoagulante','warfarina','sintrom','acenocumarol','aspirina','heparina','clopidogrel','hemofilia','trombocitopenia','plaquetas bajas','sangro mucho','me salen moretones']},
 {c:'neuromuscular',k:['miastenia','miastenia gravis','eaton lambert','esclerosis lateral','enfermedad neuromuscular']},
 {c:'autoinmune', k:['lupus','artritis reumatoide','esclerosis multiple','sjogren','esclerodermia','enfermedad autoinmune','autoinmune','crohn','colitis ulcerosa','enfermedad celiaca','celiaca','hashimoto','psoriasis','vitiligo','sarcoidosis']},
 {c:'embarazo',   k:['embarazo','embarazada','estoy esperando','espero un bebe','espero guagua','lactancia','amamantando','dando pecho','doy pecho']},
 {c:'cancer',     k:['cancer','quimioterapia','quimio','radioterapia','tumor','oncolog','leucemia','linfoma','melanoma']},
 {c:'infeccion',  k:['herpes','herpes labial','fuego labial','infeccion en la piel','piel infectada','acne infectado','absceso','tengo covid','tengo influenza','tengo gripe','tengo fiebre','rosacea','dermatitis','brote en la piel','herida abierta']},
 {c:'alergia',    k:['alergia a la toxina','alergia al acido','alergia al relleno','alergia a la anestesia','soy alergic']},
 {c:'cronica',    k:['diabetes','diabetica','diabetico','azucar alta','hipertension','presion alta','hipotiroidismo','hipertiroidismo','tiroides','colesterol','dislipidemia','asma','epoc','rinitis','migraña','jaqueca','gastritis','reflujo','colon irritable','artrosis','artritis','osteoporosis','anemia','higado graso','epilepsia','depresion','ansiedad','vih','hepatitis','enfermedad renal','insuficiencia renal','enfermo del corazon','cardiaco','arritmia','marcapaso']},
];
var _CT_NOTE={
 sangrado:'puede aumentar el riesgo de <b>moretones o sangrado</b>. No siempre se suspende el medicamento; lo coordinamos con criterio clínico y, si corresponde, con tu médico tratante.',
 neuromuscular:'el <b>bótox</b> puede estar <b>contraindicado</b> o requerir mucha precaución en enfermedades neuromusculares. Es indispensable evaluarlo junto a tu neurólogo antes de aplicar cualquier toxina.',
 autoinmune:'requiere <b>precaución</b>: a veces se evitan ciertos rellenos o bioestimuladores, sobre todo en un brote activo. Lo evaluamos caso a caso, idealmente con tu especialista tratante.',
 embarazo:'durante el <b>embarazo y la lactancia no realizamos inyectables</b> por precaución. Te orientamos en cuidado de la piel seguro y dejamos tu plan listo para después.',
 cancer:'durante un <b>tratamiento oncológico activo posponemos</b> los procedimientos; necesitamos el visto bueno de tu oncólogo. Lo conversamos con calma en tu evaluación.',
 infeccion:'si hay una <b>infección o brote activo</b> en la zona, esperamos a que se resuelva. Para herpes labial frecuente y tratamiento de labios, indicamos un antiviral preventivo.',
 alergia:'las alergias a estos productos son <b>muy poco frecuentes</b>, pero si tuviste una reacción previa es clave avisarlo: lo revisamos a fondo en tu evaluación antes de aplicar nada.',
 cronica:'tenerla <b>bien controlada no impide</b> la mayoría de los tratamientos. Solo necesitamos revisarla en tu evaluación, junto a tu historia y tus medicamentos, para hacerlo con total seguridad.',
};
function _treatLabel(q){
  if(/(botox|toxina|botulinic|congelar|entrecejo|frente|patas de gallo)/.test(q)) return 'el bótox';
  if(/(labio|relleno|acido hialuron|hialuron|surco|ojera|menton|pomulo|armonizacion)/.test(q)) return 'el ácido hialurónico / rellenos';
  if(/(sculptra|bioestim|colageno|hilos|hilo tensor|flacidez)/.test(q)) return 'la bioestimulación o los hilos';
  if(/(salmon|exosoma|polinucleot|mesoterap|skinbooster|pink glow|hidrafacial)/.test(q)) return 'los tratamientos regenerativos';
  if(/(rino|nariz)/.test(q)) return 'la rinomodelación';
  if(/(peeling|laser|depilacion)/.test(q)) return 'ese procedimiento';
  return 'los tratamientos estéticos';
}
function _cap(s){ return s ? s.charAt(0).toUpperCase()+s.slice(1) : s; }
function _condTreat(q){
  var hasTreat=/(botox|toxina|botulinic|acido hialuron|hialuron|relleno|labio|ojera|surco|sculptra|bioestim|colageno|hilos|rino|nariz|mesoterap|skinbooster|salmon|exosoma|polinucleot|peeling|laser|depilacion|pink glow|hidrafacial|tratamiento estetic|procedimiento estetic|armonizacion)/.test(q);
  var estCtx=/(cara|rostro|arruga|estetic|piel|me veo|verme|lucir|facial)/.test(q);
  var hasVerb=/(puedo|podria|me puedo|me hago|hacerme|colocar|colocarme|ponerme|me pongo|poner|aplicar|me aplico|me pueden|es seguro|contraindic|hace mal|hace dano|me afecta|igual me|me lo puedo|sirve para mi|me dejan)/.test(q);
  if(!(hasTreat || (hasVerb && estCtx))) return null;
  for(var i=0;i<JCM_COND.length;i++){ for(var j=0;j<JCM_COND[i].k.length;j++){ if(q.indexOf(JCM_COND[i].k[j])>=0) return {cond:JCM_COND[i].k[j],cat:JCM_COND[i].c}; } }
  var dx=_dxScore(q);
  if(dx) return {cond:dx.n,cat:'cronica',dxName:dx.n};
  return null;
}

function _norm(s){return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');}
function _clean(s){return s.replace(/&oacute;/g,'o').replace(/&aacute;/g,'a').replace(/&eacute;/g,'e').replace(/&iacute;/g,'i').replace(/&uacute;/g,'u').replace(/&ntilde;/g,'n').replace(/&[a-z]+;/g,' ').toLowerCase();}
function _price(kw){var out=[];CATALOGO.forEach(function(it){if(_clean(it.n).indexOf(kw)>=0){var ps=it.v.map(function(x){return (x.l?x.l+': ':'')+x.p;}).join(' · ');out.push('• '+it.n+' — '+ps);}});return out;}
function sugT(tk,ans){var c=[['sesion','Tiempo del procedimiento'],['efecto','Duración del efecto'],['dolor','¿Duele?'],['precio','Precio'],['cuidados','Cuidados']];var out=[];for(var i=0;i<c.length&&out.length<3;i++){if(c[i][0]!==ans)out.push(c[i][1]+' · '+NM[tk]);}return out;}
function jcmBotAnswer(qRaw){var q=_norm(qRaw);
  function has(){for(var i=0;i<arguments.length;i++)if(q.indexOf(arguments[i])>=0)return true;return false;}
  function done(txt,sugs){return {html: txt+'<br><br><i>Orientación general. Para información 100% fidedigna y tu plan personalizado, agenda tu evaluación o escríbeme por WhatsApp.</i>', sugs: sugs||['¿Qué es el Bótox?','Precios','¿En qué consiste la evaluación?']};}
  if(has('direccion','donde','ubicacion','llegar','plaza','horario','hora atienden','atienden','abren','que dias','dias atienden','pago','pagar','tarjeta','debito','credito','efectivo','transferencia','medios de pago'))
    return done(LOG,['Precios','¿En qué consiste la evaluación?','¿Qué es el Bótox?']);
  if(has('jc medical','empresa','proyecto','quien eres','quien es','quienes','enfermero','juan claudio','sobre ti','clinica','de que se trata'))
    return done('En <b>JC Medical</b> trabajamos la medicina estética con criterio clínico, resultados naturales y seguridad, de la mano de <b>Juan Claudio Parra</b>, Enfermero Universitario. '+LOG,['Precios','¿En qué consiste la evaluación?','¿Qué es el Bótox?']);
  if(has('evaluacion') && has('consiste','incluye','como es','de que','en que','que es','para que sirve','en que se'))
    return done('La <b>evaluación</b> es una consulta presencial con criterio clínico: analizamos tu piel y tus objetivos, revisamos tu historia y definimos el tratamiento más adecuado y un plan personalizado para ti. Dura unos 20 a 30 minutos y cuesta $15.000, que se descuenta al realizar el procedimiento.',['Precios','Agendar evaluación','¿Qué es el Bótox?']);
  // Cruce condición de salud × tratamiento ("si tengo X, ¿puedo Y?")
  var _ct=_condTreat(q);
  if(_ct){
    var _tl=_treatLabel(q), _nt=_CT_NOTE[_ct.cat];
    var _title=_ct.cat==='embarazo'?'Embarazo y lactancia · '+_tl:_cap(_ct.dxName||_ct.cond)+' · '+_tl;
    return done('<b>'+_title+'</b><br>Sobre '+_tl+': '+_nt+'<br><br>Regla de oro en JC Medical: <b>nada se aplica sin una evaluación previa</b> donde revisamos tu historia, tus condiciones y tus medicamentos para confirmar que es seguro para ti. Si tienes informes de tu médico, tráelos.',['¿En qué consiste la evaluación?','Agendar evaluación','¿Qué es el Bótox?']);
  }
  // ── Recomendación por objetivo (público con y sin conocimiento previo) ──
  if(has('mas frecuente','mas frecuentes','mas comun','mas comunes','mas popular','mas pedidos','mas solicitados','mas hacen','procedimientos frecuentes','tratamientos frecuentes','que recomiendan','recomendados','que se hacen','que tratamiento hay','que tratamientos hay','que ofrecen','que hacen aqui'))
    return done('Los procedimientos <b>más solicitados</b> en JC Medical:<br>• <b>Toxina botulínica (Botox)</b> — arrugas de expresión (frente, entrecejo, patas de gallo).<br>• <b>Ácido hialurónico</b> — labios, pómulos, mentón y rinomodelación.<br>• <b>Bioestimulación de colágeno (Sculptra)</b> — firmeza y calidad de piel.<br>• <b>NCTF / mesoterapia</b> — luminosidad, hidratación y manchas.<br><br>Cuéntame qué te gustaría mejorar y te oriento.',['Tratamiento para arrugas','Tratamiento para flacidez','Tratamiento para manchas']);
  if(has('arruga','lineas de expresion','linea de expresion','entrecejo','patas de gallo','ceno','el gesto','frente marcada','expresion marcada','marcas de expresion'))
    return done('Para <b>arrugas de expresión</b> (frente, entrecejo, patas de gallo) lo más indicado es la <b>toxina botulínica (Botox)</b>: relaja el músculo que las marca y suaviza el gesto de forma natural, sin congelar. Se nota desde el día 3 a 7 y dura 3 a 6 meses. <b>Botox 3 zonas desde $150.000.</b>',['¿Cómo se aplica el Bótox?','¿Duele el Bótox?','Precios','Agendar evaluación']);
  if(has('flacidez','flacida','flacido','firmeza','perdida de firmeza','piel caida','piel flacida','perdi firmeza','tono de la piel','descolgad','poco firme','colageno','rejuvenecer la piel','calidad de piel'))
    return done('Para <b>flacidez y falta de firmeza</b> recomendamos la <b>bioestimulación de colágeno (Sculptra)</b>: estimula tu propio colágeno y mejora densidad, firmeza y calidad de la piel de forma progresiva y natural. Dura hasta ~24 meses. <b>Desde $450.000</b>, con planes de sesiones.',['¿Qué es la bioestimulación?','¿Cuántas sesiones?','Precios','Agendar evaluación']);
  if(has('mancha','melasma','pigment','tono disparejo','luminosidad','piel opaca','opaca','pano','hiperpigment','piel apagada','sin brillo'))
    return done('Para <b>manchas, tono disparejo y falta de luminosidad</b> recomendamos <b>NCTF / mesoterapia (biorevitalización)</b>: revitaliza la piel y mejora hidratación, textura y luminosidad. Se complementa con cuidados y fotoprotección. <b>Desde $150.000</b>, con planes de sesiones.',['¿Cuántas sesiones?','¿Duele?','Precios','Agendar evaluación']);
  // ── Dudas frecuentes de todo público (18–55, con y sin conocimiento previo) ──
  if(has('primera vez','nunca me he hecho','nunca me hecho','me da miedo','tengo miedo','es mi primera','nunca me he puesto','soy primeriza','no me he hecho nada'))
    return done('Tranquila/o, es muy común venir por primera vez. Empezamos por una <b>evaluación</b> sin compromiso: conversamos lo que te gustaría mejorar, revisamos tu piel y te explicamos opciones, tiempos y cuidados. Nada se aplica sin tu acuerdo y siempre buscamos un resultado natural.',['¿En qué consiste la evaluación?','Procedimientos más frecuentes','Agendar evaluación']);
  if(has('es seguro','seguro','peligroso','peligro','riesgo','riesgos','es riesgoso','tiene riesgo'))
    return done('Son procedimientos <b>seguros</b> cuando los realiza un profesional capacitado, con producto original y previa evaluación de tu historia clínica. Pueden existir efectos leves y transitorios (enrojecimiento, hematoma). En tu evaluación revisamos tus antecedentes para confirmar que es seguro para ti.',['¿En qué consiste la evaluación?','¿Duele?','Agendar evaluación']);
  if(has('se nota','natural','cara congelada','congelad','exagerad','quedar rara','quedar raro','se ve falso','fake','sobrecargad'))
    return done('Nuestra filosofía es la <b>naturalidad</b>: dosificamos por zona según tu rostro, nunca por plantilla. El objetivo es que te veas descansada/o y fresca/o, no “operada/o”. Los resultados realzan tus rasgos manteniendo tu expresión.',['Tratamiento para arrugas','Ver resultados','Agendar evaluación']);
  if(has('muy joven','muy vieja','muy viejo','que edad','edad recomend','tengo 18','tengo 19','tengo 20','soy joven','demasiado tarde','muy mayor','a mi edad'))
    return done('No hay una edad única: lo importante es el objetivo. Desde los <b>18</b> se puede prevenir y armonizar; en cada etapa hay tratamientos adecuados (prevención, corrección o firmeza). En tu evaluación definimos lo más conveniente para tu edad y tu piel.',['Procedimientos más frecuentes','¿En qué consiste la evaluación?','Agendar evaluación']);
  if(has('puedo trabajar','volver al trabajo','reposo','tiempo de recuperacion','cuanto me recupero','baja','recuperacion','hacer vida normal','salir despues'))
    return done('La mayoría de los tratamientos permiten <b>hacer vida normal de inmediato</b>. Puede haber enrojecimiento o un leve hematoma temporal. Te entregamos indicaciones de cuidado según el procedimiento (evitar ejercicio intenso o calor por 24–48 h, por ejemplo).',['Tratamiento para arrugas','¿Duele?','Agendar evaluación']);
  if(has('para hombre','soy hombre','los hombres','hombres pueden','para varones'))
    return done('¡Por supuesto! Cada vez más <b>hombres</b> se tratan con nosotros. Lo más pedido: toxina para suavizar el ceño, definición de mandíbula con ácido hialurónico y bioestimulación para firmeza. Todo con un enfoque natural y masculino.',['Procedimientos más frecuentes','Tratamiento para arrugas','Agendar evaluación']);
  var t=null,k;for(k in KB){if(KB[k].syn.some(function(w){return q.indexOf(w)>=0;})){t=k;break;}}
  var a=null;
  if(has('precio','cuesta','vale','valor','costo'))a='precio';
  else if(has('cuantas sesiones','numero de sesiones','sesiones necesit','plan de sesiones','cuantas veces'))a='sesiones';
  else if(has('efecto','dura el efecto','cuanto dura el efecto'))a='efecto';
  else if(has('demora','tarda','rapido','tiempo','procedimiento','cuanto se demora','cuanto toma','la sesion'))a='sesion';
  else if(has('duele','dolor','anestesia','molesta'))a='dolor';
  else if(has('cuidado','despues','recuperacion','post','reposo','contraindic'))a='cuidados';
  else if(has('dura','duracion','meses'))a='efecto';
  else if(has('que es','para que','sirve','que hace','beneficio'))a='que';
  if(has('agendar','reserva','cita'))
    return done('Puedes agendar con el botón verde de WhatsApp o &laquo;Agendar evaluación&raquo;. La evaluación cuesta $15.000 y se descuenta del tratamiento.',['¿En qué consiste la evaluación?','Precios','¿Qué es el Bótox?']);
  if(!t && has('hola','buenas','buenos dias','gracias','que tal'))
    return done('Hola, cuéntame qué tratamiento te interesa o usa una de estas opciones.',['¿Qué es el Bótox?','Precios','¿En qué consiste la evaluación?']);
  if(has('alergi'))
    return done('Las reacciones alérgicas a estos tratamientos son muy poco frecuentes. La forma segura de saberlo es en tu <b>evaluación</b>, donde revisamos tu historia clínica, alergias y antecedentes para confirmar que el tratamiento es seguro para ti. Si has tenido reacciones a tratamientos previos, cuéntamelo y lo vemos con criterio clínico.',['¿En qué consiste la evaluación?','¿Qué es el Bótox?','Precios']);
  if(has('me servira','me sirve','sirve para mi','soy candidat','candidata','candidato','me conviene','funcionara','me funciona','sirve en mi caso','es para mi','me ayudaria'))
    return done('Eso lo definimos en tu <b>evaluación</b>: analizamos tu piel, tus objetivos y tus rasgos para recomendarte el tratamiento que realmente te conviene y los resultados esperables en tu caso. Así evitamos gastos innecesarios y logramos un resultado natural y seguro.',['¿En qué consiste la evaluación?','Precios','¿Qué es el Bótox?']);
  if(has('marca','que producto','que usan','que utilizan','que ocupan','que toxina','original'))
    return done('Trabajamos con marcas certificadas y de primer nivel. En toxina botulínica usamos <b>Botox</b> (marca original); en bioestimulación, <b>Sculptra</b>; y en relleno, ácido hialurónico de alta calidad. En tu evaluación te confirmo la marca exacta según tu tratamiento.',['¿Cómo se aplica el Bótox?','¿En qué consiste la evaluación?','Precios']);
  if(has('como se aplica','como aplica','aplicacion','como inyect','como se pone','como se hace','como lo hacen')){
    if(t==='botox'||has('botox'))return done('<b>Bótox</b><br>Se aplica con una <b>microaguja mediante punción directa</b> en los puntos precisos del músculo. Es un procedimiento rápido (unos 30 minutos) y <b>prácticamente indoloro</b>: solo se sienten pequeños pinchazos muy breves. No requiere reposo.',sugT('botox','dolor'));
    if(t)return done('<b>'+KB[t].nm+'</b><br>Se aplica de forma precisa con microaguja o cánula según el tratamiento, usando anestesia tópica o frío para tu comodidad. Te explico el paso a paso en tu evaluación.',sugT(t,'dolor'));
    return done('Cada tratamiento se aplica de forma precisa y segura, con microaguja o cánula según corresponda y anestesia tópica para tu comodidad. ¿Sobre cuál quieres saber?',['¿Cómo se aplica el Bótox?','¿Qué es el Bótox?','Precios']);
  }
  if(has('ver resultado','ver los resultado','cuando se ve','cuando se nota','cuando notare','aparecen los resultado','cuanto demora en ver','tarda en hacer efecto','hace efecto','en cuanto se ve','cuando hace efecto','cuando veo')){
    var on={botox:'desde los 10 días aproximadamente (máximo a las 2 a 3 semanas)',bioestim:'de forma progresiva durante las semanas siguientes',salmon:'de forma progresiva en las semanas siguientes',rino:'de inmediato',ha:'de inmediato',hiper:'a los 3 a 7 días aproximadamente',meso:'de forma progresiva en los días siguientes',lipo:'de forma progresiva en las semanas siguientes',exo:'de forma progresiva',pink:'de inmediato y mejora en los días siguientes'};
    if(t)return done('<b>'+KB[t].nm+'</b><br>Los resultados se ven '+(on[t]||'según el tratamiento')+'.',sugT(t,'efecto'));
    return done('Cuándo se ven los resultados:<br>• Bótox: desde ~10 días<br>• Bioestimulación: progresivo (semanas)<br>• ADN de salmón: progresivo (semanas)<br>• Rinomodelación y ácido hialurónico: inmediato<br>• Hiperhidrosis: 3 a 7 días',['¿Qué es el Bótox?','Precios','¿En qué consiste la evaluación?']);
  }
  var lead={que:'',sesion:'La sesión es ',efecto:'El efecto ',dolor:'Es ',cuidados:'Cuidados: ',sesiones:'Sesiones: '};
  if(t){var e=KB[t];
    if(a==='precio'){var p=_price(e.pk);return done('<b>'+e.nm+'</b><br>'+(p.length?p.join('<br>'):'Te confirmo el valor exacto en tu evaluación.')+'<br><br>La evaluación cuesta $15.000 y se descuenta del tratamiento.',sugT(t,'precio'));}
    if(a&&e[a])return done('<b>'+e.nm+'</b><br>'+lead[a]+e[a],sugT(t,a));
    var fqt=_faqScore(q);  // sin dimensión: una FAQ específica (embarazo, combinar, zona) gana al "qué es" genérico
    if(fqt)return done(fqt.a, fqt.s||['¿En qué consiste la evaluación?','Precios','¿Qué es el Bótox?']);
    return done('<b>'+e.nm+'</b><br>'+e.que+'<br><br>La sesión es '+e.sesion+'<br>El efecto '+e.efecto,sugT(t,null));
  }
  var faq=_faqScore(q);
  if(faq)return done(faq.a, faq.s||['¿En qué consiste la evaluación?','Precios','¿Qué es el Bótox?']);
  var dx=_dxScore(q);
  if(dx)return _dxAnswer(dx);
  if(a==='precio'){var lines=[];['botox','bioestim','salmon','rinomodel','acido hialur','hiperhidrosis'].forEach(function(kw){_price(kw).forEach(function(p){if(lines.indexOf(p)<0)lines.push(p);});});return done('Algunos valores referenciales:<br>'+(lines.length?lines.join('<br>'):'Dime qué tratamiento te interesa.')+'<br><br>La evaluación cuesta $15.000 y se descuenta del procedimiento.',['¿Qué es el Bótox?','¿En qué consiste la evaluación?','Agendar evaluación']);}
  if(a==='sesiones'){return done('El número de <b>sesiones</b> depende del tratamiento:<br>• <b>Botox</b>: 1 sesión, con control y retoque al día 21.<br>• <b>Sculptra</b> (bioestimulación): 1 a 3 sesiones según tu nivel de flacidez.<br>• <b>NCTF / mesoterapia</b>: 3 sesiones.<br>• <b>Quemadores de grasa</b>: 3 a 6 sesiones según necesidad.<br><br>El plan exacto lo definimos en tu evaluación.',['¿Cuántas sesiones? · Sculptra','¿Cuántas sesiones? · NCTF','Agendar evaluación']);}
  if(a==='sesion'){var L=[];['botox','bioestim','salmon','rino','ha','hiper'].forEach(function(kk){L.push('• '+KB[kk].nm+': '+KB[kk].sesion);});return done('Todos los procedimientos demoran entre 30 y 60 minutos. En detalle:<br>'+L.join('<br>'),['Tiempo del procedimiento · Bótox','¿Qué es la bioestimulación?','¿En qué consiste la evaluación?']);}
  if(a==='efecto'){return done('Duración aproximada del efecto:<br>• Bótox: 3 a 6 meses<br>• Bioestimulación: progresivo, hasta 24 meses<br>• ADN de salmón: ~6 meses con mantención<br>• Rinomodelación: hasta 12 meses<br>• Ácido hialurónico: 6 a 18 meses<br>• Hiperhidrosis: 4 a 9 meses',['¿Qué es el Bótox?','Precios','¿En qué consiste la evaluación?']);}
  return done('Puedo orientarte sobre <b>bótox, bioestimulación, ADN de salmón, rinomodelación, ácido hialurónico, hiperhidrosis, mesoterapia y lipolítico</b>, además de precios, dirección, seguridad, embarazo, edad y la evaluación. También puedo darte información educativa sobre enfermedades frecuentes en Chile (con su fuente). Escríbeme tu duda.',['¿Qué es el Bótox?','Precios','Dirección y horario']);}
window.jcmBot = jcmBotAnswer;
// Detecta el procedimiento al que se refiere una frase (para mantener contexto entre preguntas).
window.jcmDetectProc = function (qRaw) {
  var q = _norm(qRaw || ''); var k;
  for (k in KB) { if (KB[k].syn.some(function (w) { return q.indexOf(w) >= 0; })) return k; }
  if (/(arruga|entrecejo|frente|patas de gallo|ceno|gesto)/.test(q)) return 'botox';
  if (/(flacidez|firmeza|descolgad|piel caida)/.test(q)) return 'bioestim';
  if (/(mancha|luminosidad|tono disparejo|opaca|melasma)/.test(q)) return 'meso';
  if (/(grasa|quemador|lipolitico|papada)/.test(q)) return 'lipo';
  return null;
};
window.JCM_CHAT_CHIPS = ['¿Qué es el Bótox?','Precios','¿En qué consiste la evaluación?','¿Cómo se aplica el Bótox?','¿Qué marca usan?','Dirección y horario'];
// Catálogo oficial expuesto para el asistente (precios reales, sin links de pago).
window.JCM_CATALOG = CATALOGO;
window.jcmPriceList = function(){
  var byCat = {};
  CATALOGO.forEach(function(it){ (byCat[it.c] = byCat[it.c] || []).push(it); });
  var out = [];
  Object.keys(byCat).forEach(function(cat){
    out.push(cat.toUpperCase());
    byCat[cat].forEach(function(it){
      var ps = it.v.map(function(x){ return (x.l ? x.l + ': ' : '') + x.p; }).join(' · ');
      out.push('• ' + it.n + ' — ' + ps);
    });
  });
  return out.join('\n');
};
})();
