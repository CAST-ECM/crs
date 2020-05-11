<template>
    <div class="maincontent">
        <Menu mode="horizontal" theme="light" active-name="1">
        <div>
            <MenuItem name="1">
            <!-- <Icon type="ios-flag-outline" /> -->
                电赛选题
            </MenuItem>
        </div>
        </Menu>
        <br>
        <component :is="componentflag" v-on:senddatatofather="getDatafromchild" v-bind:ID="ID"></component>

        
  <br>
</div>
   
</template>
<script>
import verifyID from '@/components/verifyID'
import freshmanpro from '@/components/freshmanpro'
import otherspro from '@/components/otherspro'
export default {
    name: 'choosepro',
    components: {
        verifyID,
        freshmanpro,
        otherspro
    },
    data(){
        return {
            componentflag:'verifyID',
            ID:''
        }
    },
    methods:{
        getDatafromchild(data){
            this.componentflag = data.componentflag;
            this.ID = data.ID;
        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.maincontent{
        width: 100%;
        height: 100%;
        position: absolute;
        background: white;
}

</style>
      