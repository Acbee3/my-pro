export default {
  data() {
    // 在 data() 中，且 return 之前，自定义一些校验规则
    // test 方法回去检验是否符合规范
    var checkEmail = (rule, value, callback) => {
      if (/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value) === false) {
        return callback(new Error('邮箱地址不正确'))
      }
      // 校验通过
      callback()
    }

    // 验证手机号
    var checkMobile = (rule, value, callback) => {
      if (/^1\d{10}$/.test(value) === false) {
        return callback(new Error('手机号不正确'))
      }
      callback()
    }
    return {
      // 查询用户列表时候，要携带的查询参数
      queryinfo: {
        query: '', // 用户输入的搜索条件
        pagenum: 1, // 当前请求的是第几页数据
        pagesize: 2 // 每页显示几条数据
      },
      total: 0, // 总共有多少条数据
      // 用户列表
      userList: [],
      // 添加对话框的显示和隐藏
      addDialogVisible: false,
      // 添加用户的表单
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 添加表单的验证规则
      addFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          // 使用自定义的邮箱校验规则
          {validator: checkEmail, trigger: 'blur'}
        ],
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          // 使用自定义的邮箱校验规则
          {validator: checkMobile, trigger: 'blur'}
        ]
      },
      // 编辑的表单验证规则
      editDialogVisible: false,
      // 编辑的表单数据
      editForm: {
        id: '',
        username: '',
        email: '',
        mobile: ''
      },
      // 编辑添加表单的验证规则
      editFormRules: {
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          // 使用自定义的邮箱校验规则
          {validator: checkEmail, trigger: 'blur'}
        ],
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          // 使用自定义的邮箱校验规则
          {validator: checkMobile, trigger: 'blur'}
        ]
      }
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    // 根据查询参数，获取用户列表
    async getUserList() {
      // 发起 get 请求，并携带 查询参数
      const {
        data: res
      } = await this.$http.get('users', {
        params: this.queryinfo
      })
      console.log(res)
      if (res.meta.status !== 200) return this.$message.error('获取用户信息失败')
      // 为用户列表赋值
      this.userList = res.data.users
      // 为总页数赋值
      this.total = res.data.total
    },
    // 监听 pagesize 的变化
    handleSizeChange(newsize) {
      // 把最新的 pagesize 赋值给 this.queryinfo.pagesize
      console.log(newsize)
      this.queryinfo.pagesize = newsize
      this.getUserList()
    },
    // 监听 页码值 的变化
    handleCurrentChange(newPageNum) {
      console.log(newPageNum)
      this.queryinfo.pagenum = newPageNum
      this.getUserList()
    },
    async switchChanged(newstate, id) {
      // console.log(newstate)
      // console.log(id)
      const {
        data: res
      } = await this.$http.put(`users/${id}/state/${newstate}`)
      console.log(res)
      if (res.meta.status !== 200) return this.$message.error('修改用户状态失败！')
      this.$message.success('修改用户状态成功！')
    },
    addDialogClosed() {
      // 重置表单
      this.$refs.addFormRef.resetFields()
    },
    // 添加新用户
    addUser() {
      // 调用JS方法 校验表单
      this.$refs.addFormRef.validate(async valid => {
        // console.log(valid)
        if (!valid) return
        const {data: res} = await this.$http.post('users', this.addForm)
        // console.log(res)
        if (res.meta.status !== 201) return this.$message.error('添加用户失败')
        this.$message.success('添加用户成功')
        // 隐藏对话框
        this.addDialogVisible = false
        // 刷新列表
        this.getUserList()
      })
    },
    // 关闭 编辑对话框时候的处理函数
    editDialogClosed() {
      // 重置表单
      this.$refs.editFormRef.resetFields()
    },
    // 点击编辑按钮，展示编辑的对话框
    async showEditDialog(scope) {
      const {data: res} = await this.$http.get('users/' + scope.row.id)
      if (res.meta.status !== 200) return this.$message.error('获取用户信息失败！')
      console.log(res.data)
      this.editForm.id = res.data.id
      this.editForm.username = res.data.username
      this.editForm.email = res.data.email
      this.editForm.mobile = res.data.mobile
      // 显示编辑对话框
      this.editDialogVisible = true
    },
    // 编辑用户
    editUser() {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.put('users/' + this.editForm.id, this.editForm)
        if (res.meta.status !== 200) return this.$message.error('编辑用户失败！')
        this.$message.success('编辑用户成功！')
        this.editDialogVisible = false
        this.getUserList()
      })
    },
    // 删除用户
    async remove(scope) {
      // console.log(scope.row.id)
      const confirmResult = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      // console.log(confirmResult)
      // 用户取消了删除
      if (confirmResult !== 'confirm') {
        return this.$message({
          type: 'info',
          message: '已取消删除'
        })
      }
      const {data: res} = await this.$http.delete('users/' + scope.row.id)
      console.log(res.statu)
      if (res.meta.status !== 200) return this.$message.error('删除用户失败')
      this.$message.success('删除用户成功')
      this.getUserList()
    }
  }
}
