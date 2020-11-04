const dogsLink = "http://localhost:3000/pups"
const dogContainer = document.querySelector("#dog-bar")
const dogBox = document.querySelector("#dog-info")
const dogSorter = document.querySelector("#good-dog-filter")

const fetchDogs = () => {
    fetch(dogsLink)
        .then(resp => resp.json())
        .then(dogsData => {
            renderDogs(dogsData)
        })

}


const renderDogs = (dogsData) => {
    dogContainer.innerHTML = ""

    dogsData.forEach(dog => {
        if (dogSorter.innerText === "Filter good dogs: ON"){
            if (dog.isGoodDog === true) {
                const dogSpan = document.createElement("span")
                dogSpan.dataset.id = dog.id
                dogSpan.innerText = dog.name
                dogSpan.addEventListener("click", handleMoveDog)

                dogContainer.append(dogSpan)
            }
        } else {
            const dogSpan = document.createElement("span")
                dogSpan.dataset.id = dog.id
                dogSpan.innerText = dog.name
                dogSpan.addEventListener("click", handleMoveDog)

                dogContainer.append(dogSpan)
        }
            



        // dogContainer.innerHTML += `<span class="dog-${dog.id}">${dog.name}</span>`
        // dogNode = document.querySelector(`.dog-${dog.id}`)

    })
}

const handleMoveDog = (e) => {
    const popId = e.target.dataset.id
    fetch(dogsLink + "/" + popId)
        .then(resp => resp.json())
        .then(dog => {
            dogBox.innerHTML = `<img src="${dog.image}"/> <h2>${dog.name}</h2><button data-id="${dog.id}" class= "dog-btn">${dog.isGoodDog ? "Good Dog!" : "Bad Dog!"}</button>`

            const btn = document.querySelector(".dog-btn")
            btn.addEventListener("click", e => {

                const btnSubmit = btn.innerText === "Good Dog!" ? true : false

                const dogData = {
                    isGoodDog: !btnSubmit
                }


                fetch(dogsLink + "/" + popId, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify(dogData)
                })
                    .then(resp => resp.json())
                    .then(console.log)

                if (btn.innerText === "Good Dog!") {
                    btn.innerText = "Bad Dog!"
                    fetchDogs()
                } else {
                    btn.innerText = "Good Dog!"
                    fetchDogs()
                }
            })
        })
}



fetchDogs()


//EVENT LISTENER

dogSorter.addEventListener("click", (e) => {

    if (dogSorter.innerText === "Filter good dogs: OFF") {
        dogSorter.innerText = "Filter good dogs: ON"
        
    } else {
        dogSorter.innerText = "Filter good dogs: OFF"
    }
    fetchDogs()
})


