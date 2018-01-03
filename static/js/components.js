var Table=Vue.component('Table',{
    props:['headers'],
    template:`
        <table class="table">
         <tr>
           <th v-for="item in headers">{{item}}</th>
           <th>操作</th>
         </tr>
         <tr v-for="item in datas">
           <td>{{item.id}}</td>
           <td>{{item.name}}</td>
           <td>{{item.age}}</td>
           <td>{{item.sex}}</td>
           <td><a @click="del(item.id)">删除</a> <a :href="'#/edit/'+item.id">编辑</a></td>
         </tr>
        </table>
    `,
    data(){
       return {
           datas:[

           ]
       }
    },
    mounted(){
        var that=this;
        fetch('/fetch').then(function(e){
            return e.json();
        }).then(function(e){
            that.datas=e;
        });
    },
    methods:{
        del(id){
            fetch('/del/?id='+id).then((e)=>{
                return e.text();
            }).then((e)=>{
                if(e=='ok'){
                    this.datas=this.datas.filter(ele=>ele.id!=id);
                    alert('数据删除成功');
                }
            })
        }
    }
})

var index=Vue.component('index',{
    template:`
              <Table :headers="['id','姓名','年龄','性别']"></Table>
            `
})
var add=Vue.component('add',{
    template:`<div>
                <form>
                  <div class="form-group">
                    <label for="name">name</label>
                    <input type="text" class="form-control" id="name" placeholder="name" v-model="name">
                  </div>
                  <div class="form-group">
                    <label for="age">age</label>
                    <input type="text" class="form-control" id="age" placeholder="age" v-model="age">
                  </div>
                  <div class="form-group">
                    <label for="sex">sex</label>
                    <input type="text" class="form-control" id="sex" placeholder="sex" v-model="sex">
                  </div>
                 
                  <button type="button" class="btn btn-default" @click="submit">Submit</button>
                </form>
             </div>`,
    data(){
        return {
            name:'',
            sex:'',
            age:'',
        }
    },
    methods:{
        submit(){
           var dataString='name='+this.name+'&sex='+this.sex+'&age='+this.age;
           fetch('/addCon?'+dataString).then(function(e){
               return e.text();
           }).then(function(e){
               if(e=='ok'){
                   alert('数据插入成功');
               }
           })
        }
    }
})

var edit=Vue.component('edit',{
    template:`<div>
                <form>
                  <div class="form-group">
                    <label for="name">name</label>
                    <input type="text" class="form-control" id="name" placeholder="name" v-model="name">
                  </div>
                  <div class="form-group">
                    <label for="age">age</label>
                    <input type="text" class="form-control" id="age" placeholder="age" v-model="age">
                  </div>
                  <div class="form-group">
                    <label for="sex">sex</label>
                    <input type="text" class="form-control" id="sex" placeholder="sex" v-model="sex">
                  </div>
                 
                  <button type="button" class="btn btn-default" @click="update">Submit</button>
                </form>
             </div>`,
    data(){
        return {
            name:'',
            sex:'',
            age:'',
        }
    },
    methods:{
        update(){
            var dataString='name='+this.name+'&sex='+this.sex+'&age='+this.age+'&id='+this.$route.params.id;
            fetch('/updateCon?'+dataString).then(function(e){
                return e.text();
            }).then(function(e){
                if(e=='ok'){
                    alert('数据修改成功');
                }
            })
        }
    },
    mounted(){
        var id=this.$route.params.id;
        fetch('/query/?id='+id).then((e)=>{
            return e.json();
        }).then((e)=>{
            this.name=e[0].name;
            this.sex=e[0].sex;
            this.age=e[0].age;
        })
    }
})