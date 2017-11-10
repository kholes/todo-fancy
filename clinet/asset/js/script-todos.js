Vue.component('section-registration', {
    template: `
    <div class="container">
    <a data-toggle="modal" data-target="#modalRegister" class="tombol">Register</a>        
    <div class="modal fade" id="modalRegister" role="dialog">
        <div class="modal-dialog">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Registration member</h4>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group">
                            <label for="task">Username:</label>
                            <input v-model="formRegister.username" type="text" class="form-control" id="task">
                        </div>
                        <div class="form-group">
                            <label for="task">Password:</label>
                            <input v-model="formRegister.password" type="text" class="form-control" id="task">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-default" @click="registration" data-dismiss="modal">Save</button>
                </div>
            </div>          
        </div>
    </div>
    </div>
    `,
    data: function() {
        return {
            formRegister: {
                username: '',
                password: '',
                role: 'user'
            }
        }
    },
    methods: {
        registration: function() {
            axios.post('http://localhost:3000/users', this.formRegister)
            .then(({data}) => {
                this.todos = data
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
})

Vue.component('section-login', {
    template: `
    <div class="container">
        <div id="login" class="col-md-6">
            <div id="form-login" class="form-group" v-if="!loginStatus.status">
                <form @submit.prevent="login">
                    <label for="date">Username</label>
                    <input id="date" v-model="userLogin.username" class="form-control input-lg" type="text">
                    <label for="task">Password</label>
                    <input id="task" v-model="userLogin.password" class="form-control input-lg" type="password">
                    <br>
                    <button type="submit" class="btn btn-success" data-dismiss="modal">Login</button>         
                </form>
                <section-registration></section-registration>
            </div>
            <div v-else="" id="logout">
                <a @click="logout">Logout</a>
            </div>
        </div>
    </div>
    `,
    props: ['loginStatus'],
    data: function() {
        return {
            userLogin: {
                username: '',
                password: ''        
            },
            formRegister: {
                username: '',
                password: '',
                role: 'user'
            }
        }
    },
    methods: {
        logout: function (){
            this.$emit('logout')
        },
        login: function () {
            this.$emit('login', this.userLogin)
        },
        registration: function() {
            console.log(this.formRegister)
        }
    }
})
//================ LIST TODOS COMPONENT =================//
Vue.component('section-list', {
    template: `
        <div class="container">
            <div class="col-md-8">
                <a data-toggle="modal" data-target="#modalTask" class="tombol">Add Todo</a>        
                <!-- Modal -->
                <div class="modal fade" id="modalTask" role="dialog">
                    <div class="modal-dialog">
                        <!-- Modal content-->
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                <h4 class="modal-title">Add Task</h4>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div class="form-group">
                                        <label for="task">Task description:</label>
                                        <input v-model="formTask.task" type="text" class="form-control" id="task">
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                <button type="submit" class="btn btn-default" @click="add_task" data-dismiss="modal">Save</button>
                            </div>
                        </div>          
                    </div>
                </div>
                <div class="list">
                    <div class="media" v-for="val in todos">
                        <div class="media-body">
                            <p><a @click="remove(val._id)"><i class="fa fa-times"></i></a> {{val.task}}</p>
                            <i class="media-heading">{{val.date}}</i>
                        </div>
                        <div class="media-right">
                            <div class="dropdown">
                                <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                    <i v-if="val.status == 'pending'" class="fa fa-child"></i>
                                    <i v-if="val.status == 'progres'" class="fa fa-clock-o"></i>
                                    <i v-if="val.status == 'done'" class="fa fa-check-square-o"></i>
                                    <span class="caret"></span>
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
                                    <li><a href="#" @click="set_status(val._id, 'pending')">Pending</a></li>
                                    <li><a href="#" @click="set_status(val._id, 'progres')">Progres</a></li>
                                    <li><a href="#" @click="set_status(val._id, 'done')">Done</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    props: ['todos','loginStatus'],
    data: function() {
        return {
            formTask: {
                date: new Date(),
                task: '',
                status: 'pending',
                user: this.loginStatus.id
            }
        }
    },
    methods: {
        add_task: function () {
            this.$emit('add_task', this.formTask)
        },
        remove: function(id) {
            this.$emit('remove_task', id)
        },
        set_status: function (id, value) {
            this.$emit('set_status', id, value)
        }
    }
})

//================ PARENT COMPONENT =================//
Vue.component('section-todos', {
    template: `
    <div class="container">
        <section-login :loginStatus="loginStatus" @login="login" @logout="logout"></section-login>
        <section-list :todos="todos" :loginStatus="loginStatus" @add_task="addTask" @remove_task="removeTask" @set_status="setStatus" v-if="loginStatus.status"></section-list>        
    </div>
    `,
    data: function() {
        return {
            loginStatus: {
                status: false
            },
            todos: ''
        }
    },
    methods: {
        setHome: function() {
            if(this.loginStatus.status) {
                $('#login').hide()
            }
            $('#login').show()
        },
        isLogin: function() {
            let token = JSON.parse(localStorage.getItem('accessToken'))
            axios.post('http://localhost:3000/login/cekToken', {accessToken:token.token})
            .then(({data}) => {
                data['status'] = true
                this.loginStatus = data
                this.get_all(this.loginStatus.id)                      
            })
            .catch(err => {
                console.log(err)
            })
        },
        login: function(data) {
            axios.post('http://localhost:3000/login', data)
            .then(({data}) => {
                localStorage.setItem('accessToken', JSON.stringify({token:data.newToken}))
                this.isLogin()
            })  
            .catch(err => {
                console.log(err)
            })       
        },  
        logout: function() {
            localStorage.removeItem('accessToken')
            this.loginStatus['status'] = false
        },
        get_all: function(id) {
            axios.get('http://localhost:3000/todos/user/' + id)
            .then(({data}) => {
                this.todos = data
            })
            .catch(err => {
                console.log(err)
            })
        },
        addTask: function (input) {
            axios.post('http://localhost:3000/todos', input)
            .then(({data}) => {
                this.todos.push(data)
            })
            .catch(err => {
                console.log(err)
            })
        },
        removeTask: function(id) {
            axios.delete('http://localhost:3000/todos/' + id)
            .then(({data}) => {
                let idTask = this.todos.findIndex(function(task) {
                    return task.id = id
                })
                this.todos.splice(idTask, 1)
            })
            .catch(err => {
                console.log(err)
            })
        },
        setStatus(id,value) {
            axios.put('http://localhost:3000/todos/status/'+ id + '/' + value)
            .then(({data}) => {
                 this.todos.forEach((val,i) => {
                     if(val._id == id) {
                         this.todos[i].status = value
                     }
                 })
            })  
            .catch(err => {
                console.log(err)
            })          
        }
    },
    mounted: function() {
        this.isLogin()
        this.setHome()
    }
})

new Vue({
    el:'#app'
})