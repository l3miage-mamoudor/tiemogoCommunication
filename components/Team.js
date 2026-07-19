import styles from "./Team.module.css";
import { client } from "@/lib/sanity/client";
import { teamQuery } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import { TEAM } from "@/lib/content";

// Utilisé tant que le projet Sanity n'est pas configuré, ou si aucun
// membre n'a encore été ajouté dans le Studio (/studio)
const FALLBACK_TEAM = TEAM.map((member) => ({ ...member, photo: null }));

function initials(name) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

async function getTeam() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return FALLBACK_TEAM;
  try {
    const data = await client.fetch(teamQuery, {}, { next: { revalidate: 60 } });
    return data?.length ? data : FALLBACK_TEAM;
  } catch {
    return FALLBACK_TEAM;
  }
}

export default async function Team() {
  const team = await getTeam();

  return (
    <section id="equipe" className="section section--paper">
      <div className="container">
        <p className="eyebrow">L'équipe</p>
        <h2 className={styles.title}>
          Nous devenons vous pour mieux vous révéler
        </h2>
        <p className={styles.lead}>
          Une méthodologie qui consiste à comprendre votre univers de
          l'intérieur pour identifier ce qui vous rend unique de l'extérieur.
        </p>

        <div className={styles.grid}>
          {team.map((member) => (
            <div key={member.name} className={styles.member}>
              <div className={styles.avatar}>
                {member.photo ? (
                  <img
                    src={urlFor(member.photo).width(300).height(300).url()}
                    alt={member.name}
                  />
                ) : (
                  <span>{initials(member.name)}</span>
                )}
              </div>
              <p className={styles.name}>{member.name}</p>
              <p className={styles.role}>{member.role}</p>
              {member.signature && <p className={styles.signature}>{member.signature}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
