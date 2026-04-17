
import {styles} from '../styles/Home.module.css'
import {useState} from 'react';
import {useRouter} from 'next/router';


export default function SearchTrend(props) {
    const router = useRouter();
    const placehold = '#' + props.hashtagName;
    const [search, setSearch] = useState('');

    const handleChange = (e) => setSearch(e.target.value)
  return (
    <>
    <section>Hashtag</section>
    <section>
    <form
        onSubmit={(e) => {
          e.preventDefault(); // <-- prevent the default form action
          const cleanWord = search.replace('#', '');
           props.changeSlug(cleanWord);
           router.push(`/hashtags/${cleanWord}`);
        }}
      >
        <input
          key="searchBox"
          type="text"
          value={search}
          placeholder={placehold}
          onChange={(event) => handleChange(event)}
        />
      </form>
      </section>
    
    </>
  )
}