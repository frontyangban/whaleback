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
      {link && (
        <a
          href={link}
          target="_blank"
          className="text-sm text-blue-600 underline mt-1 inline-block"
        >
          🔗 {link}
        </a>
      )}
      <p className="text-xs my-1 text-gray-500">🧰 {stack}</p>
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
            <li>
              다양한 도메인을 경험하며 많은 프로젝트를 일정 연기 없이
              출시했습니다.
            </li>
            <li>
              위에 나열한 주요한 스킬셋을 기반으로 Agile 방법론에 따라 업무를
              진행했습니다.
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
            title="쏘카 디자인 시스템 개발"
            period="2025.01 - 2025.03"
            stack="React, TypeScript, Turborepo, TailwindCSS"
            description="다각화된 컴포넌트 관리 문제를 해결하기 위해 디자인 시스템"
          >
            <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
              <li>개발환경 구축, 파운데이션 개발 및 npm 배포 진행</li>
              <li>레거시 디자인 토큰 이관을 위한 마이그레이터 CLI 도구 제작</li>
            </ul>
          </ProjectInfo>

          <ProjectInfo
            title="Monorepo CI 개선 및 유지보수"
            period="2025.02"
            stack="Turborepo, Github Actions"
            description="workflow 개선 및 빌드 시간 단축"
          >
            <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
              <li>
                turborepo 빌드 이후 S3에 캐시를 업로드하여 불필요한 재빌드 방지
              </li>
              <li>dry-run 및 matrix strategy 도입으로 빌드 시간 47% 단축</li>
            </ul>
          </ProjectInfo>

          <ProjectInfo
            title="항공권 예약 시스템"
            period="2024.07 - 2024.12"
            stack="Next.js, React, TypeScript, TailwindCSS"
            description="쏘카에서 국내선 항공권을 구매할 수 있는 신규 서비스 개발"
            link="https://flight.socar.kr"
          >
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-gray-700">
              <li>
                업무 분배 및 일정 관리를 담당하여 팀 내 생산성 및 안정성 향상
              </li>
              <li>
                스프린트 종료 전 스모크 테스트 도입으로 QA 이전 단계에서 기본
                안정성 확보
              </li>
              <li>
                3rd-party 발권사 API 기반으로 작업하며, UX/데이터 상 불필요한
                요소를 최소화하여 사용자 경험 개선
              </li>
            </ul>
          </ProjectInfo>

          <ProjectInfo
            title="소셜사인업"
            period="2024.05 - 2024.08"
            stack="Next.js, React, TypeScript, TailwindCSS, NextAuth, OAuth"
            description="OAuth 기반 카카오, 네이버 간편 가입 및 로그인"
            link="https://social-signup.socar.kr/auth/sign-in"
          >
            <ul className="space-y-1 text-sm mt-2 list-disc pl-5">
              <li>업무 분배 및 일정 관리</li>
              <li>쏘카 아이디 로그인을 위한 Custom Provider 구현</li>
              <li>Google Vision을 활용한 웹 면허 인증과 탈퇴 페이지 구축</li>
            </ul>
          </ProjectInfo>

          <ProjectInfo
            title="블랙박스 어드민"
            period="2024.04 - 2024.06"
            stack="React, TypeScript, AWS S3(Glacier, Deep Glacier), shadcn/ui, @tanstack/react-router"
            description="신규 블랙박스 스펙 도입에 따라 통합어드민에서 신규 어드민으로 MSA 전환, 신규 기능 개발"
          >
            <ul className="list-disc pl-5 space-y-1 mt-2 text-sm">
              <li>블랙박스 영상 재생용 웹 플레이어 개발</li>
              <li>스냅샷 재생용 이미지 플레이어 개발</li>
              <li>S3 Glacier/Deep Glacier 이관 기능 구현</li>
            </ul>
          </ProjectInfo>

          <ProjectInfo
            title="쏘카플랜 리뉴얼"
            period="2023.06 - 2023.06"
            stack="Next.js, React, TypeScript, TailwindCSS"
            description="장기 카셰어링 서비스 전면 리뉴얼. 기술 블로그 작성 및 혜택 태그 UI 개선."
            link="https://plan.socar.kr"
          >
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-gray-700">
              <li>전사 IMC 스케쥴에 맞추어 서비스 전면 리뉴얼</li>
              <li>메인 페이지, 차량 리스트, 차량 상세 페이지 구현</li>
              <li>
                사내 기술 블로그{' '}
                <a
                  href="https://tech.socarcorp.kr/dev/2024/03/06/socarplan-renewal.html"
                  target="_blank"
                  className="underline text-blue-400"
                >
                  쏘카플랜 개편기
                </a>{' '}
                기고
              </li>
            </ul>
          </ProjectInfo>
        </div>
      </section>

      {/* Education */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold border-b pb-2 mb-2">
          🎓 Education
        </h2>
        <p className="text-sm">
          한양대학교 ERICA – 영미언어문화학과 학사 졸 (2009.03 ~ 2016.08)
        </p>
        <p className="text-sm">
          웹 개발 & 데이터사이언티스트 양성 과정 - 교육 수료 (2020.09 ~ 2021.03)
        </p>
      </section>

      {/* Certifications */}
      <section>
        <h2 className="text-2xl font-semibold border-b pb-2 mb-2">
          📜 Certifications
        </h2>
        <ul className="list-disc pl-6 text-sm space-y-1">
          <li>정보처리기사 취득 (2021.08)</li>
        </ul>
      </section>
    </main>
  )
}

export default About
