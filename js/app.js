(function (Vue) {
	const todos = [
		{ id: 1, title: '吃饭', completed: false },
		{ id: 2, title: '睡觉', completed: true },
		{ id: 3, title: '打豆豆', completed: false }
	]
	const vue = new Vue({
		
		el:'#app',
		data:{
			todos:JSON.parse(window.localStorage.getItem('todos')) || [],
			currentEdit: null,
			filterText:'all'
		},
		methods:{
			// 添加
			handleAdd (e) {
				inputval = e.target.value.trim()
				if ( inputval.length === 0 ) {
					return
				}
				this.todos.push({
					id:Math.random(),
					title:inputval,
					completed:false
				})
				e.target.value = ''
			},
			// 删除
			handleDelete (index) {
				this.todos.splice(index,1)
			},
			// 清除所有是否显示	
			hasCompleted () {
				// 这个方法的返回值就是 true|false
				// 
				return this.todos.some(item => {
					return item.completed === true
				})
			},
			// 清除所有
			handleDeleteAllCompleted () {
				for ( i = 0; i < this.todos.length; i++) {
					 
					if (this.todos[i].completed === true) {

						this.todos.splice(i,1)

						i--
					}
				}
				
			},
			// 未完成个数
			getRemaining () {
				return this.todos.filter(item => {
					return item.completed === false
				}).length
			},
			// 切换所有任务项的完成状态
			handleToggleAll (e) {
				const checked = e.target.checked
				this.todos.forEach(item => {
					item.completed = checked
				})
			},
			// 全选按钮是否选中
			everyCompleted () {
				return this.todos.every(item => {
					return item.completed === true
				})
			},
			// 双击进入编辑
			showEdit (item) {
				this.currentEdit = item
			},
			// 取消编辑
			handleCancelEdit () {
				this.currentEdit = null
			},
			// 保存编辑
			SaveEditor (item,index,e) {
				newinputval = e.target.value.trim()
				if (newinputval.length === 0 ) {
					return this.handleDelete(index)
				}
				item.title = newinputval
				this.currentEdit = null
			},
			// 列表显示的数据
			filterTodos () {
				if (this.filterText === 'all') {
					return this.todos
				}else if ( this.filterText === 'active') {
					return this.todos.filter(item => {
						return item.completed === false
					})
				}else if ( this.filterText === 'completed') {
					return this.todos.filter(item => {
						return item.completed === true
					})
				}
			},
			// // 点击全部
			// handleall () {
			// 	this.filterText = 'all'
			// },
			// 点击未完成
			// a () {
			// 	this.filterText = 'active'
			// },
			// // 点击已完成按钮
			// b () {
			// 	this.filterText = 'completed'
			// }
		},
		// 监听数据中的变化，如果数据有变化，就进入到这里
		// 这里的成员必须是data中的成员
		// deep:true 因为引用数据类型，不能监测到成员中的子成员，
		// 所以用它深监测，这样只要是子成员有变化就会监听到了
		// 这里localstrorage 这个window成员中的setitem方法是往浏览器本地储存数据，格式为key：value
		// value 存储进去是字符串，等到取值得时候，需要转换才能得到希望的数据类型
		watch:{
			todos:{
				handler (newvla) {
					window.localStorage.setItem('todos',JSON.stringify(newvla))
				},
				deep:true
			}
		}
	})
	// 这个事件是 地址栏的锚点#后面的变了 就会触发这个事件，
	// 正好html的a标签的href属性就是#.. 所以点击的时候地址栏就会变#...
	// 顶级对象window中有个 location成员，这个成员下边有个hash属性，这个属性的value就是地址栏#...
	// 所以当点击a标签的时候，就能触发这个事件处理函数，
	// 在事件处理函数中判断这个 hash 的值，
	window.onhashchange = handleHashChange

	function handleHashChange () {
		if ( window.location.hash === '#/') {
			vue.filterText = 'all'
		}else if ( window.location.hash === '#/active' ) {
			vue.filterText = 'active'
		}else if ( window.location.hash === '#/completed') {
			vue.filterText = 'completed'			
		}
		// console.log('1222')
	}
})(Vue);
