// function makeTeacher(n) {
//     return {name: n, hoursTaught: 0};
// }

class Teacher {
    constructor(n) {
        this.name = n;
        this.hoursTaught = 0;
    }
    dadJoke(teacher) {
        console.log(teacher + " made a funny");
    }
    teach(student) {
        student.fundamentalsProficiency = student.fundamentalsProficiency + 1;
        this.hoursTaught = this.hoursTaught + 1;
    }
}

// function makeStudent(n, we) {
//     return {name: n, fundamentalsProficiency: 0, workEthic: we};
// }

class Student {
    constructor(n, we) {
        this.name = n;
        this.fundamentalsProficiency = 0;
        this.workEthic = we;
    }
    getProficiency(student) {
        return this.fundamentalsProficiency;
    }
    doProject(student) {
        if(this.fundamentalsProficiency < 5) {
            console.log(this.name + " was not ready to take on the project");
        } else {
            console.log(this.name + " successfully completed the project!");
        }
    }
    study(student) {
        this.fundamentalsProficiency = this.fundamentalsProficiency + this.workEthic;
    }
}


// function teach(teacher, student) {
//     student.fundamentalsProficiency = student.fundamentalsProficiency + 1;
//     teacher.hoursTaught = teacher.hoursTaught + 1;
// }

// function getProficiency(student) {
//     return student.fundamentalsProficiency;
// }

// function dadJoke(teacher) {
//     console.log(teacher + " made a funny");
// }

// function doProject(student) {
//     if(student.fundamentalsProficiency < 5) {
//         console.log(student.name + " was not ready to take on the project");
//     } else {
//         console.log(student.name + " successfully completed the project!");
//     }
// }

// function study(student) {
//     student.fundamentalsProficiency = student.fundamentalsProficiency + student.workEthic;
// }

var jack = new Teacher("jack");
var bob = new Student("bob", 10);
var susan = new Student("susan", 12);

jack.teach(bob);
jack.teach(susan);
bob.doProject();
susan.doProject();
bob.study();
susan.study();
bob.doProject();
susan.doProject();