<template>
  <div>

    <el-tabs v-model="listenstage" type="card" closable @tab-click="ClickTab" @tab-remove="removeTab">
      <el-tab-pane v-for="(item, index) in editableTabs" :key="item.name" :label="item.title" :name="item.name">
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
    export default {
        name: "HrmTabs",
        data(){
            return{
                editableTabsValue: this.$store.state.hrmTabsValue,
                editableTabs: this.$store.state.hrmTabs,
                tabIndex: 1,
            }
        },
        methods:{
            addTab(targetName) {
                // let newTabName = ++this.tabIndex + '';
                // this.editableTabs.push({
                //     title: 'New Tab'+newTabName.toString(),
                //     name: newTabName,
                // });
                // this.editableTabsValue = newTabName;
                this.$store.commit('SetTabs')
            },
            removeTab(targetName) {
                let tabs = this.editableTabs;
                let activeName = this.editableTabsValue;
                if (activeName === targetName) {
                    tabs.forEach((tab, index) => {
                        if (tab.name === targetName) {
                            let nextTab = tabs[index + 1] || tabs[index - 1];
                            if (nextTab) {
                                activeName = nextTab.name;
                            }
                        }
                    });
                }

                this.editableTabsValue = activeName;
                this.editableTabs = tabs.filter(tab => tab.name !== targetName);
            },
            ClickTab(target){
                console.log(target.name)
            }
        },
        computed:{
            listenstage(){
                return this.$store.state.hrmTabsValue
            }
        }
    }
</script>

<style scoped>

</style>
