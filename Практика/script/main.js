function post_data() {
    let name,theme,file;
    name = document.getElementsByTagName("input")[0].value
    theme = document.getElementById("theme").options.selectedIndex;
}

window.onload = function() {
    ;((D, B, log = arg => console.log(arg)) => {

        const dropZone = D.getElementById('file')
        file_input = D.querySelectorAll('input')
        const input = file_input[1]
        let file
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
            }
            else {
                dropZone.classList.add('input_file_error')
                return
            }
        }
    })(document, document.body)
};