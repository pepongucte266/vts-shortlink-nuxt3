<script setup lang='ts'>
  const { signIn } = useAuth()

  const supabaseAuth = useSupabaseClient();

  const isLogginIn = ref(true);

  const form = reactive({
    email: '',
    password: '',
    error: ''
  })

  /**
  *Mô tả: Hàm xử lý đăng nhập bằng github
  *created by: VTSON 10-03-10
  */
  const handleGithubLogin = async () => {
    // await supabaseAuth.auth.signInWithOAuth({
    //   provider: 'github',
    // })
    signIn('github')
  }

  /**
  *Mô tả: Hàm sử lý nut submit form
  *created by: VTSON 10-03-10
  */
  const handleSubmitaForm = async () => {
    form.error = '';
    if(!form.email || !form.password) {
      form.error = 'Xin hãy nhập đầy đủ email, mật khẩu';
      return;
    }

    if(isLogginIn.value) {
      return await handleEmailLogin();
    } else {
      return await handleSignUp();
    }
  }

  /**
  *Mô tả: Hàm xử lý đăng nhập bằng email
  *created by: VTSON 10-03-10
  */
  const handleEmailLogin = async () => {
    if(!form.email || !form.password) {
      form.error = 'Xin hãy nhập đầy đủ email, mật khẩu';
      return;
    }
    try {
      const {data, error} = await supabaseAuth.auth.signInWithPassword({
        email: form.email,
        password: form.password
      })

      if(error) {
        form.error = error.message;
        return;
      }

      if(data) {
        useRouter().push('/dashboard')
      }

    } catch (err) {
      form.error = 'Có lỗi xảy ra'
    }
  }

  /**
  *Mô tả: Xử lý đăng ký
  *created by: VTSON 10-03-10
  */
  const handleSignUp = async () => {
    if(!form.email || !form.password) {
      form.error = 'Xin hãy nhập đầy đủ email, mật khẩu';
      return;
    }
    try {
      const {data, error} = await supabaseAuth.auth.signUp({
        email: form.email,
        password: form.password
      })

      if(error) {
        form.error = error.message;
        return;
      }
      form.error = 'Please check your email to verify your account'
    } catch (err) {
      form.error = 'Có lỗi xảy ra'
    }
  }
</script>

<template>
  <section class='h-screen grid place-content-center'>
    <div class="container">
      <!-- Card -->
      <div class="card">
        <div class="flex justify-center">
          <div class="flex justify-center items-center w-20 h-20 rounded-full border shadow-xl border-white/20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-8 h-8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
              />
            </svg>
          </div>
        </div>
        
        <button class="btn-primary py-3 w-full rounded-full mt-5" @click="handleGithubLogin">
          Continue with Github
        </button>

        <hr class="border-white/10 my-8">

        <form @submit.prevent="handleSubmitaForm">
          <div class="form-group">
            <label for="email">Email</label>
            <input 
              v-model="form.email" 
              type="email" 
              name="email"
              id="email" 
              placeholder="example@gmail.com"
            />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input 
              v-model="form.password" 
              type="password" 
              name="password" 
              id="password"
            />
          </div>
          <button type="submit" class="btn-primary py-3 w-full rounded-full my-5 mt-2">
            <template v-if="isLogginIn">Login</template>
            <template v-else>Signup</template>
          </button>

          <div class="text-center">
            <button type="button" class="text-center text-white/70" @click="isLogginIn = !isLogginIn">
              <template v-if="isLogginIn">
                <span class="text-white/40">Don't have an account?</span> Signup
              </template>
              <template v-else>
                <span class="text-white/40">Already have an account?</span> Login
              </template>
            </button>
          </div>
          
          

          <div class="text-red-600 text-center mt-5">{{ form.error }}</div>
        </form>
      </div>

      <!-- ./Card -->
    </div>
  </section>
</template>
