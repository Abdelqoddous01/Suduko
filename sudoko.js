

let rowscolums=[
[0, 1, 2, 3, 4, 5, 6, 7, 8],
[9, 10, 11, 12, 13, 14, 15, 16, 17],
[18, 19, 20, 21, 22, 23, 24, 25, 26],
[27, 28, 29, 30, 31, 32, 33, 34, 35],
[36, 37, 38, 39, 40, 41, 42, 43, 44],
[45, 46, 47, 48, 49, 50, 51, 52, 53],
[54, 55, 56, 57, 58, 59, 60, 61, 62],
[63, 64, 65, 66, 67, 68, 69, 70, 71],
[72, 73, 74, 75, 76, 77, 78, 79, 80]
]

let boxs = [
    [0, 1, 2, 9, 10, 11, 18, 19, 20],
    [3, 4, 5, 12, 13, 14, 21, 22, 23],
    [6, 7, 8, 15, 16, 17, 24, 25, 26],
    [27, 28, 29, 36, 37, 38, 45, 46, 47],
    [30, 31, 32, 39, 40, 41, 48, 49, 50],
    [33, 34, 35, 42, 43, 44, 51, 52, 53],
    [54, 55, 56, 63, 64, 65, 72, 73, 74],
    [57, 58, 59, 66, 67, 68, 75, 76, 77],
    [60, 61, 62, 69, 70, 71, 78, 79, 80]
];

// console.log("id:"+id)
// console.log("Content:"+content)
// console.log(createObj(id,content))
// Objarr.push(createObj(id,content))

// Initialize a 2D array with 9 arrays, each containing 9 empty strings
const sudokuArray = Array.from({ length: 9 }, () => Array(9).fill(''));




document.addEventListener('DOMContentLoaded', () => {

    let deletelem=document.getElementById("delete");
    let newpuzzle=document.getElementById("new");
    let reset=document.getElementById("reset");
    const nums=document.getElementById("nums");
    const choices=Array.from(nums.children);
    const container = document.getElementById("container");
    const childElements = Array.from(container.children); // Convert to array
    const Objarr = [];
    let actua_choice="";
    let cliked_id;

    //new Puzzle
    newpuzzle.addEventListener("click",()=>{
        alert("This option is not available for now")
    })

  
    
    //reset table
    reset.addEventListener("click",()=>{
        childElements.forEach(child =>{
            child.textContent="";
        })
        
    }) 
    //end

    //to check the final results
    for (let i = 0; i < childElements.length; i++) {
        let id = Number(childElements[i].id);
        let content = childElements[i].textContent;
        Objarr.push(createObj(id, content));

    }




    childElements.forEach(child => {
        child.addEventListener("click", () => {
            if (actua_choice ===""){
                alert("Choose a number")
            }
            else{
                cliked_id=Number(child.id)
                console.log(`Element with id ${cliked_id} clicked!`);
                
                if(checkPosition(cliked_id,actua_choice)){
                    child.textContent=actua_choice;
                    child.style.color="black";
                    console.log("Number is valid")
                }
                else{
                    child.style.color="red";
                    child.textContent=actua_choice;
                    console.log("Number is not valid")
                }

                
                actua_choice="";
            }
        });
    });

    choices.forEach(choice=>{
        choice.addEventListener("click",()=>{
            console.log("Player choice : "+choice.textContent);
            actua_choice=choice.textContent;
        })
    })

    function createObj(id, content) {
        return {
            id: id,
            content: content
        };
    }


    function checkPosition(id,actua_choice){
        //take the index of the choice and compar the choice if it exist in the array and if the choice exist in the column 
        let indexa;
        let indexe;
        for (let i=0;i<9;i++){
            for(let j=0;j<9;j++){
                if(rowscolums[i][j]==id){
                    indexa=i;
                    indexe=j;
                    break;
                }
            }
        }

        let is_valid = true;
        let indexb;
        //check box
        for (let i = 0; i < 9; i++) {
            if (boxs[i].includes(id)) {
                indexb = i;
                break;
            }
        }

        for (let i = 0; i < 9; i++) {
            if (i == indexb) {
                continue;
            }
        
            let boxRow = Math.floor(indexb / 3) * 3 + Math.floor(i / 3);
            let boxCol = (indexb % 3) * 3 + (i % 3);
        
            if (sudokuArray[boxRow][boxCol] == actua_choice) {
                is_valid = false;
                break;
            }
        }
        
        for(let i=0;i<9;i++){
            if(boxs[indexb][i]!=id){
                continue
            }
            else if(sudokuArray[boxs[indexb][i]]==actua_choice && boxs[indexb][i]!=id){
                is_valid=false;
                break;
            }
            else if (sudokuArray[i][indexe] != actua_choice && i != indexa) {
                sudokuArray[indexa][indexe]=actua_choice;
            }
        }
        
        // Check columns
        if(is_valid){
            for (let i = 0; i < 9; i++) {
                if (i == indexa) {
                    continue;
                } else if (sudokuArray[i][indexe] == actua_choice && i != indexa) {
                    is_valid = false;
                    break;
                }
                else if (sudokuArray[i][indexe] != actua_choice && i != indexa) {
                    sudokuArray[indexa][indexe]=actua_choice;
                }
            }
        }

        //check row

        if(is_valid){
            for(let i=0;i<9;i++){
                if(i==indexe){
                    continue;
                }
                else if(i!=indexe && sudokuArray[indexa][i]==actua_choice){
                    is_valid=false;
                    break;
                }
            }
        }

        
        return is_valid
    }

});

