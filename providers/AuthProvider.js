import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../app/lib/supabase' 

const AuthContext = createContext({
  session: null,
  user: null,
  profile: null,
});


export default function AuthProvider({ children }) {

  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
          setSession(session)
      })

      supabase.auth.onAuthStateChange((_event, session) => {
          setSession(session)
      })
  }, []);

  useEffect(() => {
      if (!session?.user) {
          setProfile(null);
          return;
      }
      const fetchProfile = async () => {
          let { data, error } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();
          setProfile(data);
      };
      fetchProfile();
  }, [session?.user])

  const value = {
      session,
      user: session?.user,
      profile
  };

  return (
      <AuthContext.Provider value={value}>
          {children}
      </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);