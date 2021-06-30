var File,Name,Theme;

function post_data() {
	
   Name = document.getElementsByTagName("input")[0].value
	Theme = document.getElementById("theme").value;

	var xmlhttp = getXmlHttp(); // Создаём объект XMLHTTP
	xmlhttp.open('POST', 'index.php', true); // Открываем асинхронное соединение
	xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded', 'Access-Control-Allow-Origin: *'); // Отправляем кодировку
	xmlhttp.send("Name=" + encodeURIComponent(Name) + "&Theme=" + encodeURIComponent(Theme) + "&File=" + encodeURIComponent(File)); // Отправляем POST-запрос
	xmlhttp.onreadystatechange = function () { // Ждём ответа от сервера
		if (xmlhttp.readyState == 4) { // Ответ пришёл
			if (xmlhttp.status == 200) { // Сервер вернул код 200 (что хорошо)
				console.log(xmlhttp.responseText); // Выводим ответ сервера
			}
		}
	};
	
}

window.onload = function() {
    ;((D, B, log = arg => console.log(arg)) => {

        const dropZone = D.getElementById('file')
        file_input = D.querySelectorAll('input')
        const input = file_input[1]
        D.addEventListener('dragover', ev => ev.preventDefault())
        D.addEventListener('drop', ev => ev.preventDefault())


        dropZone.addEventListener('drop', ev => {
            // отключаем поведение по умолчанию
            ev.preventDefault()


            file = ev.dataTransfer.files[0]

            // передаем файл в функцию для дальнейшей обработки
            handleFile(file)
        })

        dropZone.addEventListener('click', () => {
            // кликаем по скрытому инпуту
            input.click()

            // обрабатываем изменение инпута
            input.addEventListener('change', () => {
                // извлекаем File
                file = input.files[0]

                // передаем файл в функцию для дальнейшей обработки
                handleFile(file)
            })
        })

        const handleFile = file => {
            let name = file.name.split('.')[1]
            if(name ==='obj')
            {
					dropZone.classList.remove('input_file_error')
					dropZone.classList.add('input_file_ok')
					File = this.file;
					
            }
				else {
					 dropZone.classList.remove('input_file_ok')
                dropZone.classList.add('input_file_error')
                return
            }
		  }
	 })(document, document.body)
};


function getXmlHttp() {
    var xmlhttp;
    try {
      xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
    try {
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    } catch (E) {
      xmlhttp = false;
    }
    }
    if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
      xmlhttp = new XMLHttpRequest();
    }
    return xmlhttp;
  }
