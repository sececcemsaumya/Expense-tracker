const fs = require('fs')
const create = (student)=>{
    let students = [ ]
    fs.readFile('./Student.json','utf8',(error,data)=>{
        let ac = data?JSON.parse(data):[];
        if(ac.length>0){
            students=[...ac,student]
        }
        else{
            students=[student]
        }
        fs.writeFile('./Student.json',JSON.stringify(students),'utf8',(error)=>{
            if(error){
                console.log("Error writing data")
            }
            else{
                console.log("Data written successfully")
            }
        })
    })
    
}
create({id:1,name:"Saumya",rollno:48,age:19})

const read = ()=>{
    fs.readFile('./Student.json','utf8',(error,data)=>{
        if(error){
            console.log("Error reading the file");
            return;
        }
        console.log(data);
    })
}
read();

const updateStudent = (id, updateData) => {
    fs.readFile('./Student.json', 'utf8', (error, data) => {
        if (error) {
            console.log('Error reading file:', error);
            return;
        }

        let students = data ? JSON.parse(data) : [];

        const studentIndex = students.findIndex(student => student.id === id);
        
        if (studentIndex !== -1) {
            students[studentIndex] = { ...students[studentIndex], ...updateData };

            fs.writeFile('./Student.json', JSON.stringify(students, null, 2), 'utf8', (writeError) => {
                if (writeError) {
                    console.log('Error writing data:', writeError);
                } else {
                    console.log('Student data updated successfully');
                }
            });
        } else {
            console.log('Student not found!');
        }
    });
};

updateStudent(1, { name: 'Saumya M', age: 20 });

const deleteStudent = (id) => {
    fs.readFile('./Student.json', 'utf8', (error, data) => {
        if (error) {
            console.log('Error reading file:', error);
            return;
        }

        let students = data ? JSON.parse(data) : [];

        const studentIndex = students.findIndex(student => student.id === id);
        
        if (studentIndex !== -1) {
            students.splice(studentIndex, 1);  

            fs.writeFile('./Student.json', JSON.stringify(students, null, 2), 'utf8', (writeError) => {
                if (writeError) {
                    console.log('Error writing data:', writeError);
                } else {
                    console.log('Student data deleted successfully');
                }
            });
        } else {
            console.log('Student not found!');
        }
    });
};

deleteStudent(1);
