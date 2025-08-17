import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(email, password);
      navigate('/');
    } catch (err: any) {
      setError(err?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const bgPattern = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill='%23FDEBDD' fill-opacity='0.6'%3E%3Crect x='0' y='0' width='10' height='10'/%3E%3Crect x='20' y='20' width='10' height='10'/%3E%3Crect x='40' y='40' width='10' height='10'/%3E%3Crect x='60' y='60' width='10' height='10'/%3E%3Crect x='80' y='80' width='10' height='10'/%3E%3Crect x='10' y='90' width='10' height='10'/%3E%3Crect x='30' y='70' width='10' height='10'/%3E%3Crect x='50' y='50' width='10' height='10'/%3E%3Crect x='70' y='30' width='10' height='10'/%3E%3Crect x='90' y='10' width='10' height='10'/%3E%3C/g%3E%3C/svg%3E\")";

  return (
    <div className="bg-[var(--brand-light)] min-h-screen"
      style={{
        ['--brand-primary' as any]: '#E68019',
        ['--brand-secondary' as any]: '#FDEBDD',
        ['--brand-dark' as any]: '#181411',
        ['--brand-light' as any]: '#F4F2F0',
        ['--brand-muted' as any]: '#887563',
      }}
    >
      <div className="relative flex min-h-screen flex-col items-center justify-center bg-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-50" style={{ backgroundImage: bgPattern }} />
        <div className="relative z-10 flex w-full max-w-5xl items-stretch rounded-2xl bg-white shadow-2xl md:flex-row">
          {/* Left form */}
          <div className="w-full p-8 md:w-1/2 md:p-12 lg:p-16">
            <header className="mb-8 flex items-center gap-3">
              <div className="size-8 text-[var(--brand-primary)]">
                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 8.18819L4.98454 15.1294C3.7939 15.5577 3 16.687 3 17.9523V30.843C3 32.4963 4.01719 33.9793 5.55962 34.5747L22.9197 41.2754C23.6149 41.5438 24.3851 41.5438 25.0803 41.2754L42.4404 34.5747C43.9828 33.9793 45 32.4963 45 30.843V17.9523C45 16.687 44.2061 15.5577 43.0155 15.1294L24 8.18819Z" fill="var(--brand-secondary)" fillRule="evenodd" clipRule="evenodd" />
                  <path d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
                  <path d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819Z" fill="currentColor" />
                  <path d="M9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487Z" fill="currentColor" opacity="0.5" />
                  <path d="M27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263Z" fill="currentColor" opacity="0.5" />
                </svg>
              </div>
              <h1 className="text-[var(--brand-dark)] text-2xl font-bold leading-tight tracking-tighter">Neurolearn</h1>
            </header>

            <h2 className="mb-2 text-3xl font-bold text-[var(--brand-dark)] tracking-tight">Welcome Back!</h2>
            <p className="mb-8 text-[var(--brand-muted)]">Let's continue your learning journey.</p>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[var(--brand-dark)]">Email Address</label>
                <div className="mt-1">
                  <input id="email" name="email" type="email" autoComplete="email" required placeholder="you@example.com"
                    className="form-input flex w-full resize-none rounded-xl border-2 border-[var(--brand-light)] bg-white px-4 py-3 text-[var(--brand-dark)] placeholder:text-[var(--brand-muted)] transition duration-150 ease-in-out focus:border-[var(--brand-primary)] focus:outline-none focus:ring-[var(--brand-primary)] sm:text-sm"
                    value={email} onChange={(e)=>setEmail(e.target.value)} />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-[var(--brand-dark)]">Password</label>
                <div className="mt-1">
                  <input id="password" name="password" type="password" autoComplete="current-password" required placeholder="••••••••"
                    className="form-input flex w-full resize-none rounded-xl border-2 border-[var(--brand-light)] bg-white px-4 py-3 text-[var(--brand-dark)] placeholder:text-[var(--brand-muted)] transition duration-150 ease-in-out focus:border-[var(--brand-primary)] focus:outline-none focus:ring-[var(--brand-primary)] sm:text-sm"
                    value={password} onChange={(e)=>setPassword(e.target.value)} />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-[var(--brand-primary)] focus:ring-[var(--brand-primary)]"
                    checked={remember} onChange={(e)=>setRemember(e.target.checked)} />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-[var(--brand-muted)]">Remember me</label>
                </div>
                <div className="text-sm">
                  <button type="button" className="font-medium text-[var(--brand-primary)] hover:text-orange-500">Forgot your password?</button>
                </div>
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}

              <div>
                <button type="submit" disabled={loading}
                  className="flex w-full justify-center rounded-full bg-[var(--brand-primary)] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">
                  {loading ? 'Signing in…' : 'Log In'}
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-[var(--brand-muted)]">
              Not a member?{' '}
              <button className="font-semibold leading-6 text-[var(--brand-primary)] hover:text-orange-500" onClick={()=>navigate('/signup')}>Create an account</button>
            </p>
          </div>
          {/* Right illustration */}
          <div className="hidden w-1/2 items-center justify-center rounded-r-2xl bg-[var(--brand-secondary)] md:flex overflow-hidden">
            <img className="w-full h-full object-cover rounded-r-2xl" alt="A colorful illustration of brain activity and learning"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvsFahvRDMTON8Ugqqxa5iZKaLWTZSL80ewkWSfnWJ3iw1Ivqm8rXxogyFiyANHum5-QVsBcpbIo-9OjG998skoSiezCjc6OEfM39X1f8-sSCbQup0SBx2SnYG17Z9ofqRnmKxCYX4YkU8zhuhsZzfF_oM_0yEvy2Bz-otfk_uZS0U93ACYcCPpKcZYu-h_m1CsvTTrSxi2gkMqVhoLtC5ThCTqHVriYEaSqVmiO76hkl4gjZ3fQBhb5UBIBha1l-fCrvZithlp5M" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const SignupPage: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  // New UI fields (single full name + confirm password + role pills)
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'student' | 'teacher' | 'parent'>('student');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const [firstName, ...rest] = fullName.trim().split(' ');
      const lastName = rest.join(' ') || 'User';
      await register({ firstName, lastName, email, password, role });
      navigate('/');
    } catch (err: any) {
      setError(err?.message || 'Sign up failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-[var(--brand-background)] text-[var(--brand-text)]"
      style={{
        // brand palette from provided reference
        // @ts-ignore - custom CSS vars for Tailwind arbitrary values
        ['--brand-primary' as any]: '#e68019',
        ['--brand-secondary' as any]: '#fef3e9',
        ['--brand-text' as any]: '#2c1b0a',
        ['--brand-background' as any]: '#fffcf9',
        ['--brand-stroke' as any]: '#fceadc',
        ['--brand-muted' as any]: '#8d7c6b',
      }}
    >
      <div className="relative flex min-h-screen flex-col items-center justify-center bg-white overflow-hidden">
        <div className="relative z-10 flex w-full max-w-5xl items-stretch rounded-2xl bg-white shadow-2xl md:flex-row">
          {/* Left panel - form */}
          <div className="w-full p-8 md:w-1/2 md:p-12 lg:p-16">
            <div>
              <div className="flex items-center gap-3">
                <svg className="h-8 w-auto text-[var(--brand-primary)]" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
                  <path d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263Z" fill="currentColor" fillRule="evenodd" />
                  <path d="M25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z" fill="currentColor" fillRule="evenodd" />
                </svg>
                <h1 className="text-2xl font-bold tracking-tight">Neurolearn</h1>
              </div>
              <h2 className="mt-8 text-3xl font-bold tracking-tight">Create your account</h2>
              <p className="mt-2 text-base text-[var(--brand-muted)]">Join a community of learners and educators.</p>
            </div>

            <div className="mt-8">
              <div className="mt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium leading-6" htmlFor="name">Full Name</label>
                    <div className="mt-2">
                      <input id="name" name="name" autoComplete="name" required placeholder="e.g. Jane Doe"
                        className="block w-full rounded-lg border-0 bg-[var(--brand-secondary)] py-3 px-4 shadow-sm ring-1 ring-inset ring-[var(--brand-stroke)] placeholder:text-[var(--brand-muted)] focus:ring-2 focus:ring-inset focus:ring-[var(--brand-primary)] sm:text-sm sm:leading-6"
                        value={fullName} onChange={(e)=>setFullName(e.target.value)} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium leading-6" htmlFor="email">Email address</label>
                    <div className="mt-2">
                      <input id="email" name="email" type="email" autoComplete="email" required placeholder="you@example.com"
                        className="block w-full rounded-lg border-0 bg-[var(--brand-secondary)] py-3 px-4 shadow-sm ring-1 ring-inset ring-[var(--brand-stroke)] placeholder:text-[var(--brand-muted)] focus:ring-2 focus:ring-inset focus:ring-[var(--brand-primary)] sm:text-sm sm:leading-6"
                        value={email} onChange={(e)=>setEmail(e.target.value)} />
                    </div>
                  </div>

                  <div>
                    <fieldset>
                      <legend className="block text-sm font-medium leading-6">I am a...</legend>
                      <div className="mt-2 grid grid-cols-3 gap-3">
                        {(['student','teacher','parent'] as const).map((r)=> (
                          <div key={r}>
                            <input className="sr-only peer" id={r} name="registration-type" type="radio" value={r} checked={role===r} onChange={()=>setRole(r)} />
                            <label htmlFor={r}
                              className="flex w-full items-center justify-center rounded-lg border-0 bg-[var(--brand-secondary)] py-3 px-4 text-sm font-medium shadow-sm ring-1 ring-inset ring-[var(--brand-stroke)] cursor-pointer peer-checked:bg-[var(--brand-primary)] peer-checked:text-white peer-checked:ring-0 peer-focus:ring-2 peer-focus:ring-inset peer-focus:ring-[var(--brand-primary)] transition-colors">
                              {r.charAt(0).toUpperCase()+r.slice(1)}
                            </label>
                          </div>
                        ))}
                      </div>
                    </fieldset>
                  </div>

                  <div>
                    <label className="block text-sm font-medium leading-6" htmlFor="password">Password</label>
                    <div className="mt-2">
                      <input id="password" name="password" type="password" autoComplete="new-password" required placeholder="Create a strong password"
                        className="block w-full rounded-lg border-0 bg-[var(--brand-secondary)] py-3 px-4 shadow-sm ring-1 ring-inset ring-[var(--brand-stroke)] placeholder:text-[var(--brand-muted)] focus:ring-2 focus:ring-inset focus:ring-[var(--brand-primary)] sm:text-sm sm:leading-6"
                        value={password} onChange={(e)=>setPassword(e.target.value)} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium leading-6" htmlFor="confirm-password">Confirm Password</label>
                    <div className="mt-2">
                      <input id="confirm-password" name="confirm-password" type="password" autoComplete="new-password" required placeholder="Re-enter your password"
                        className="block w-full rounded-lg border-0 bg-[var(--brand-secondary)] py-3 px-4 shadow-sm ring-1 ring-inset ring-[var(--brand-stroke)] placeholder:text-[var(--brand-muted)] focus:ring-2 focus:ring-inset focus:ring-[var(--brand-primary)] sm:text-sm sm:leading-6"
                        value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} />
                    </div>
                  </div>

                  {error && <p className="text-sm text-red-600">{error}</p>}

                  <div>
                    <button type="submit"
                      className="flex w-full justify-center rounded-full bg-[var(--brand-primary)] py-3 px-4 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 transition-colors"
                      disabled={loading}
                    >
                      {loading ? 'Creating…' : 'Sign up'}
                    </button>
                  </div>
                </form>

                <p className="mt-8 text-center text-sm text-[var(--brand-muted)]">
                  Already have an account?{' '}
                  <button className="font-semibold leading-6 text-[var(--brand-primary)] hover:text-orange-500 transition-colors" onClick={()=>navigate('/login')}>Log in</button>
                </p>
              </div>
            </div>
          </div>
          {/* Right panel - image */}
          <div className="hidden w-1/2 items-center justify-center rounded-r-2xl md:flex overflow-hidden" style={{backgroundColor: 'var(--brand-secondary)'}}>
            <img
              className="w-full h-full object-cover rounded-r-2xl"
              alt="A friendly, cartoon brain character with glasses, smiling and waving, surrounded by colorful abstract shapes."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuANdtawddyeyJTjJQxpKUSUi9fBIU2Hog8MddY0IYhSSHj9mozWqAF9Zucw_a8Q9Www4ihHzUpjhfrpk935P5IKnKxIvw88iNeweQIX1uWi7myVDasM8ABYcuOlchqEzZmwnWBDCBk1jkaBpw-XBCaYQzz-TdRqCi7O9nmfDnFeTneVEqyd6zR6MqBK6eFkiy8Er6UYZjbd_GZ0p5WX6mmBO4D6D7azsXx83XiUFk3Rt5ppAP6gIl2hYweo7VKeQBQk00MezLIWp1Q"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
