import GithubIcon from '@/components/svgs/GithubIcon'

interface ProjectInfoProps {
  title: string
  period: string
  stack: string
  description: string
  link?: string
  children?: React.ReactNode
}

const ProjectInfo = ({
  description,
  title,
  period,
  stack,
  link,
  children,
}: ProjectInfoProps) => {
  return (
    <div className="border rounded-xl p-4 shadow-sm bg-white">
      <div className="flex justify-between items-center">
        <h4 className="text-lg font-semibold">{title}</h4>
        <span className="text-xs text-gray-500">{period}</span>
      </div>
      <p className="text-sm text-gray-700 mt-1">{description}</p>
      <p className="text-xs mt-2 text-gray-500">🧰 {stack}</p>
      {link && (
        <a
          href={link}
          target="_blank"
          className="text-sm text-blue-600 underline mt-1 inline-block"
        >
          🔗 {link}
        </a>
      )}
      {children}
    </div>
  )
}

const About = () => {
  return (
    <main className="text-gray-800 font-sans">
      {/* Header */}
      <section className="mb-12">
        <h1 className="text-4xl font-extrabold text-gray-700">Taeyang Kim</h1>
        <p className="text-lg text-gray-600 mt-1">Frontend Developer</p>
        <div className="mt-2 text-sm text-gray-500 space-y-1">
          <a href="mailto:frontyangban@gmail.com">📧 frontyangban@gmail.com</a>{' '}
          <br />
          <a
            href="https://github.com/yangban2"
            className="inline-flex items-center"
            target="_blank"
          >
            <GithubIcon className="w-4 h-4 mr-1" /> yangban2
          </a>
        </div>
        <p className="mt-4 text-gray-700">
          도메인에 구애받지 않고 제품을 버그 없이 빠르게 개발하는 제너럴리스트.{' '}
          <br />
          팀의 생산성을 높이는 시스템과 구조에 관심이 많습니다. <br />
          쉽게 쓸 수 있는 사용자 경험을 추구합니다. <br />
        </p>
      </section>

      {/* Skills */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold border-b pb-2 mb-4">
          🛠 Skills (Bold for majority)
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-gray-600">Frontend</p>
            <b>React</b>, <b>Next.js</b>, <b>JavaScript</b>, <b>TypeScript</b>
          </div>
          <div>
            <p className="text-gray-600">Styling</p>
            <b>TailwindCSS</b>, <b>Sass</b>, CSS Modules
          </div>
          <div>
            <p className="text-gray-600">State Management</p>
            <b>React Query</b>, Recoil
          </div>
          <div>
            <p className="text-gray-600">Devops</p> AWS (<b>S3</b>,{' '}
            <b>CloudFront</b>, <b>Route53</b>, <b>Amplify</b>),{' '}
            <b>GitHub Actions</b>
          </div>
          <div>
            <p className="text-gray-600">Etc</p> <b>Turborepo</b>, NextAuth,
            tanstack/react-router, Svelte.js, MF
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold border-b pb-2 mb-6">
          💼 Experiences
        </h2>

        {/* SOCAR */}
        <div className="mb-8">
          <h3 className="text-xl font-bold">쏘카 SOCAR</h3>
          <p className="mb-2 text-gray-600">3 years</p>
          <p className="text-sm text-gray-500">
            2022.04 - 2024.07 | Asset팀 매니저 <br />
            2024.08 - 2024.11 | User Growth FE팀 리더 <br />
            2024.12 - 2025.03 | FE Core팀 리더
          </p>
          <ul className="mt-2 list-disc pl-5 text-sm space-y-1">
            <li>디자인 시스템 구축 및 마이그레이션 CLI 도입</li>
            <li>Monorepo 기반 CI/CD 개선 → 빌드 시간 40% 단축</li>
            <li>
              <strong>쏘카항공</strong> (
              <a
                href="https://flight.socar.kr"
                target="_blank"
                className="text-blue-600 underline"
              >
                flight.socar.kr
              </a>
              ) 신규 예약 서비스 FE 리드
            </li>
            <li>
              <strong>소셜사인업</strong>: Kakao/Naver OAuth, Vision 기반 면허
              인증
            </li>
            <li>
              <strong>블랙박스 관리자</strong>: S3 Glacier 기반 영상 관리 시스템
            </li>
          </ul>
        </div>

        {/* Eponet */}
        <div>
          <h3 className="text-xl font-bold">(주)이포넷</h3>
          <p className="mb-2 text-gray-600">1 year</p>
          <p className="text-sm text-gray-500">
            2021.04 - 2022.03 | IT서비스사업본부 주임
          </p>
          <ul className="mt-2 list-disc pl-5 text-sm space-y-1">
            <li>Hanpass 체크카드 웹뷰 및 백오피스 Full-stack 개발</li>
            <li>Spring Boot 기반 VP 어드민 리뉴얼 및 이관 개발</li>
          </ul>
        </div>
      </section>

      {/* Projects */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold border-b pb-2 mb-6">
          🚀 Projects
        </h2>

        <div className="space-y-4">
          <ProjectInfo
            title="쏘카플랜 리뉴얼"
            period="2023.06 - 2023.09"
            stack="Next.js, React, TypeScript, TailwindCSS"
            description="장기 카셰어링 서비스 전면 리뉴얼. 기술 블로그 작성 및 혜택 태그 UI 개선."
            link="https://plan.socar.kr"
          >
            <div>ddd</div>
          </ProjectInfo>
          <ProjectInfo
            title="쏘카 간편결제"
            period="2022.12 - 2023.02"
            stack="React, TypeScript"
            description="결제 퍼널을 줄인 원클릭 결제 UX 구축"
          />
          <ProjectInfo
            title="차량자원 관리자"
            period="2022.05 - 2023.08"
            stack="React, Yarn Berry, Monorepo"
            description="Vue 기반 관리 시스템을 React로 이관하고 Monorepo 환경으로 통합"
          />
        </div>
      </section>

      {/* Education */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold border-b pb-2 mb-2">
          🎓 Education
        </h2>
        <p className="text-sm">
          한양대학교 ERICA – 영미언어문화학과 (2009.03 ~ 2016.08)
        </p>
      </section>

      {/* Certifications */}
      <section>
        <h2 className="text-2xl font-semibold border-b pb-2 mb-2">
          📜 Certifications
        </h2>
        <ul className="list-disc pl-6 text-sm space-y-1">
          <li>정보처리기사 (2021.08)</li>
          <li>
            웹 개발 / 데이터사이언티스트 국비지원 교육 수료 (2020.09 ~ 2021.03)
          </li>
        </ul>
      </section>
    </main>
  )
}

export default About
