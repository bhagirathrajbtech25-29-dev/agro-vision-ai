import React from 'react';
import { 
  GraduationCap, 
  FileText, 
  ExternalLink, 
  Cpu, 
  Layers, 
  Award, 
  TrendingUp, 
  CheckCircle, 
  Download,
  BookMarked,
  Microchip,
  Sparkles
} from 'lucide-react';

interface AcademicDossierProps {
  lang: 'en' | 'hi';
}

export const AcademicDossier: React.FC<AcademicDossierProps> = ({ lang }) => {
  const pdfPath = '/assets/aistudio/Tomato_Leaf_Disease_Mini_Project_Report_9f837f24.pdf';

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* University & College Credentials Header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-indigo-950 p-6 sm:p-8 rounded-3xl border border-indigo-500/30 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>AKTU B.Tech Mini Project Submission • Session 2026–27</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Tomato Leaf Disease Diagnosis and Remedy Advisory System Using Deep Learning
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Submitted in partial fulfilment of the requirement for the degree of Bachelor of Technology in Computer Science & Engineering – AIML to Dr. A.P.J. Abdul Kalam Technical University (AKTU), Lucknow.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/docs/report.html"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-5 py-3 rounded-2xl shadow-lg flex items-center gap-2 cursor-pointer transition text-xs sm:text-sm active:scale-95"
            >
              <FileText className="w-4 h-4" />
              <span>Open Official Report (Printable A4 PDF)</span>
              <ExternalLink className="w-3.5 h-3.5 ml-1" />
            </a>

            <a
              href={pdfPath}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold px-4 py-3 rounded-2xl border border-slate-700 flex items-center gap-2 cursor-pointer transition text-xs sm:text-sm active:scale-95"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span>Original Attached PDF</span>
            </a>
          </div>
        </div>
      </div>

      {/* Student & Faculty Supervision Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Student Investigator</span>
          <h3 className="text-base font-bold text-white mt-1">Bhagirath Raj</h3>
          <p className="text-xs text-indigo-400 font-mono mt-0.5">Roll No: 2501721530027</p>
          <p className="text-xs text-slate-400 mt-1">Semester: III Sem (Sec 2H)</p>
        </div>

        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Project Supervisor</span>
          <h3 className="text-base font-bold text-white mt-1">Mr. Abhishek Suraj</h3>
          <p className="text-xs text-emerald-400 mt-0.5">Assistant Professor</p>
          <p className="text-xs text-slate-400 mt-1">Dept. of CSE & Allied Branches</p>
        </div>

        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Institution</span>
          <h3 className="text-base font-bold text-white mt-1">Lloyd Institute of Engg.</h3>
          <p className="text-xs text-slate-300 mt-0.5">Knowledge Park II, Greater Noida</p>
          <p className="text-xs text-slate-400 mt-1">Affiliated to AKTU, Lucknow</p>
        </div>

        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Academic Verification</span>
          <h3 className="text-base font-bold text-emerald-400 mt-1 flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4" />
            <span>Turnitin Verified</span>
          </h3>
          <p className="text-xs text-slate-300 mt-0.5">Similarity Index: 8% (Permitted &lt; 20%)</p>
          <p className="text-xs text-slate-400 mt-1">Date: 22/10/2026</p>
        </div>
      </div>

      {/* Comparison: Report Version vs Upgraded System */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div>
            <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">Engineering Progression</span>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              From Report Baseline to Current Upgraded Platform
            </h2>
          </div>
          <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full font-bold">
            Major Enhancements Added
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-850 space-y-2">
            <div className="font-bold text-xs uppercase tracking-wider text-slate-400">
              Report Prototype (Baseline)
            </div>
            <ul className="text-xs text-slate-300 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-slate-500">•</span>
                <span>Restricted strictly to 3 pre-defined classes (Early Blight, Late Blight, Healthy).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-slate-500">•</span>
                <span>Static hardcoded dictionary in Flask backend (<code className="text-slate-400">REMEDY_DATABASE</code>).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-slate-500">•</span>
                <span>No weather forecast, no planting calendar, no crop lifecycle tracking.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-slate-500">•</span>
                <span>Manual single-shot upload without reminder or periodic monitoring.</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-emerald-950/40 to-slate-950 p-4 rounded-2xl border border-emerald-500/40 space-y-2">
            <div className="font-bold text-xs uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Current Production Application (User-Requested Upgrades)</span>
            </div>
            <ul className="text-xs text-emerald-100/90 space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>No Hardcoded Diseases or Medicines:</strong> Visual foliage symptoms dynamically analyzed with multimodal AI.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Live Search Grounding:</strong> Real-time Google Search fetches latest research citations (ICAR, KVK, FAO).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Real-Time Weather & Planting Window:</strong> Microclimate disease risk alert (Late Blight high-humidity alerts).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>15-Day Autonomous Inspection Cycle:</strong> Automated notifications requesting leaf photos every 15 days throughout the 90-day growth cycle.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Model Architecture & Parameters Table (From Report Table 4.2) */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base sm:text-lg font-bold text-white">
              Layer-by-Layer Sequential CNN Architecture (tomato_model.h5)
            </h3>
          </div>
          <span className="text-xs font-mono text-indigo-400 bg-indigo-950/60 border border-indigo-800/60 px-2.5 py-0.5 rounded-full">
            3,305,027 Trainable Parameters • 12.61 MB
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="text-[11px] text-slate-400 uppercase bg-slate-950/80 border-b border-slate-800">
              <tr>
                <th className="px-4 py-2.5">Layer No.</th>
                <th className="px-4 py-2.5">Layer Type</th>
                <th className="px-4 py-2.5">Kernel / Pool Size</th>
                <th className="px-4 py-2.5">Activation</th>
                <th className="px-4 py-2.5">Output Tensor Shape</th>
                <th className="px-4 py-2.5">Trainable Params</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850">
              <tr className="hover:bg-slate-850/50">
                <td className="px-4 py-2 font-mono">Input</td>
                <td className="px-4 py-2 font-semibold text-white">Input RGB Tensor</td>
                <td className="px-4 py-2">N/A</td>
                <td className="px-4 py-2">Normalized [0, 1]</td>
                <td className="px-4 py-2 font-mono text-emerald-400">(None, 128, 128, 3)</td>
                <td className="px-4 py-2 font-mono">0</td>
              </tr>
              <tr className="hover:bg-slate-850/50">
                <td className="px-4 py-2 font-mono">1</td>
                <td className="px-4 py-2 font-semibold text-white">conv2d (Conv2D)</td>
                <td className="px-4 py-2">32 Filters (3 × 3)</td>
                <td className="px-4 py-2 text-teal-400 font-mono">ReLU</td>
                <td className="px-4 py-2 font-mono text-emerald-400">(None, 126, 126, 32)</td>
                <td className="px-4 py-2 font-mono">896</td>
              </tr>
              <tr className="hover:bg-slate-850/50">
                <td className="px-4 py-2 font-mono">2</td>
                <td className="px-4 py-2 font-semibold text-white">max_pooling2d</td>
                <td className="px-4 py-2">Pool Size (2 × 2)</td>
                <td className="px-4 py-2">None</td>
                <td className="px-4 py-2 font-mono text-emerald-400">(None, 63, 63, 32)</td>
                <td className="px-4 py-2 font-mono">0</td>
              </tr>
              <tr className="hover:bg-slate-850/50">
                <td className="px-4 py-2 font-mono">3</td>
                <td className="px-4 py-2 font-semibold text-white">conv2d_1 (Conv2D)</td>
                <td className="px-4 py-2">64 Filters (3 × 3)</td>
                <td className="px-4 py-2 text-teal-400 font-mono">ReLU</td>
                <td className="px-4 py-2 font-mono text-emerald-400">(None, 61, 61, 64)</td>
                <td className="px-4 py-2 font-mono">18,496</td>
              </tr>
              <tr className="hover:bg-slate-850/50">
                <td className="px-4 py-2 font-mono">4</td>
                <td className="px-4 py-2 font-semibold text-white">max_pooling2d_1</td>
                <td className="px-4 py-2">Pool Size (2 × 2)</td>
                <td className="px-4 py-2">None</td>
                <td className="px-4 py-2 font-mono text-emerald-400">(None, 30, 30, 64)</td>
                <td className="px-4 py-2 font-mono">0</td>
              </tr>
              <tr className="hover:bg-slate-850/50">
                <td className="px-4 py-2 font-mono">5</td>
                <td className="px-4 py-2 font-semibold text-white">conv2d_2 (Conv2D)</td>
                <td className="px-4 py-2">128 Filters (3 × 3)</td>
                <td className="px-4 py-2 text-teal-400 font-mono">ReLU</td>
                <td className="px-4 py-2 font-mono text-emerald-400">(None, 28, 28, 128)</td>
                <td className="px-4 py-2 font-mono">73,856</td>
              </tr>
              <tr className="hover:bg-slate-850/50">
                <td className="px-4 py-2 font-mono">6</td>
                <td className="px-4 py-2 font-semibold text-white">max_pooling2d_2</td>
                <td className="px-4 py-2">Pool Size (2 × 2)</td>
                <td className="px-4 py-2">None</td>
                <td className="px-4 py-2 font-mono text-emerald-400">(None, 14, 14, 128)</td>
                <td className="px-4 py-2 font-mono">0</td>
              </tr>
              <tr className="hover:bg-slate-850/50">
                <td className="px-4 py-2 font-mono">7</td>
                <td className="px-4 py-2 font-semibold text-white">flatten (Flatten)</td>
                <td className="px-4 py-2">1D Feature Vector</td>
                <td className="px-4 py-2">None</td>
                <td className="px-4 py-2 font-mono text-emerald-400">(None, 25088)</td>
                <td className="px-4 py-2 font-mono">0</td>
              </tr>
              <tr className="hover:bg-slate-850/50">
                <td className="px-4 py-2 font-mono">8</td>
                <td className="px-4 py-2 font-semibold text-white">dense (Dense)</td>
                <td className="px-4 py-2">128 Units</td>
                <td className="px-4 py-2 text-teal-400 font-mono">ReLU</td>
                <td className="px-4 py-2 font-mono text-emerald-400">(None, 128)</td>
                <td className="px-4 py-2 font-mono">3,211,392</td>
              </tr>
              <tr className="hover:bg-slate-850/50">
                <td className="px-4 py-2 font-mono">9</td>
                <td className="px-4 py-2 font-semibold text-white">dropout (Dropout)</td>
                <td className="px-4 py-2">Rate p = 0.30</td>
                <td className="px-4 py-2">Regularization</td>
                <td className="px-4 py-2 font-mono text-emerald-400">(None, 128)</td>
                <td className="px-4 py-2 font-mono">0</td>
              </tr>
              <tr className="hover:bg-slate-850/50 bg-indigo-950/30">
                <td className="px-4 py-2 font-mono font-bold text-white">10</td>
                <td className="px-4 py-2 font-bold text-white">dense_1 (Output)</td>
                <td className="px-4 py-2 font-bold text-indigo-300">Classification Head</td>
                <td className="px-4 py-2 text-indigo-300 font-mono font-bold">Softmax</td>
                <td className="px-4 py-2 font-mono text-indigo-300 font-bold">(None, 3)</td>
                <td className="px-4 py-2 font-mono font-bold text-indigo-300">387</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Global Research Papers & Scientific Foundations Used in this Project */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 shadow-xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Academic Bibliography</span>
            <h3 className="text-lg font-bold text-white mt-0.5">
              Global Research Papers & Scientific Literature Cited (IEEE Format)
            </h3>
          </div>
          <a
            href="/docs/report.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1.5"
          >
            <span>View Full 20-Citation Bibliography in Report</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-850 space-y-1">
            <span className="text-[10px] font-bold text-indigo-400 font-mono">[1] Mohanty, Hughes & Salathé (2016)</span>
            <p className="font-semibold text-slate-200">Using deep learning for image-based plant disease detection</p>
            <p className="text-[11px] text-slate-400 italic">Frontiers in Plant Science, vol. 7, p. 1419.</p>
            <p className="text-[11px] text-emerald-400/90 pt-1">Contribution: Introduced the 54,306-image PlantVillage benchmark repository.</p>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-850 space-y-1">
            <span className="text-[10px] font-bold text-indigo-400 font-mono">[2] Brahimi, Boukhalfa & Moussaoui (2017)</span>
            <p className="font-semibold text-slate-200">Deep learning for tomato diseases: Classification & symptoms visualization</p>
            <p className="text-[11px] text-slate-400 italic">Applied Artificial Intelligence, vol. 31, no. 4, pp. 299–315.</p>
            <p className="text-[11px] text-emerald-400/90 pt-1">Contribution: Established tomato-specific foliar saliency maps isolating necrotic regions.</p>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-850 space-y-1">
            <span className="text-[10px] font-bold text-indigo-400 font-mono">[3] Too, Yujian, Njuki & Yingchun (2019)</span>
            <p className="font-semibold text-slate-200">A comparative study of fine-tuning deep learning models for plant disease identification</p>
            <p className="text-[11px] text-slate-400 italic">Computers and Electronics in Agriculture, vol. 161, pp. 272–279.</p>
            <p className="text-[11px] text-emerald-400/90 pt-1">Contribution: Benchmarked VGG16, ResNet50, and DenseNet121 accuracy vs parameters.</p>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-850 space-y-1">
            <span className="text-[10px] font-bold text-indigo-400 font-mono">[4] Sandler et al. (Google Research, 2018)</span>
            <p className="font-semibold text-slate-200">MobileNetV2: Inverted residuals and linear bottlenecks</p>
            <p className="text-[11px] text-slate-400 italic">IEEE/CVF Conf. Comput. Vis. Pattern Recognit. (CVPR), pp. 4510–4520.</p>
            <p className="text-[11px] text-emerald-400/90 pt-1">Contribution: Lightweight depthwise separable convolutional filter design.</p>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-850 space-y-1">
            <span className="text-[10px] font-bold text-indigo-400 font-mono">[5] Kingma & Ba (2015)</span>
            <p className="font-semibold text-slate-200">Adam: A method for stochastic optimization</p>
            <p className="text-[11px] text-slate-400 italic">Int. Conf. Learn. Represent. (ICLR), San Diego, CA.</p>
            <p className="text-[11px] text-emerald-400/90 pt-1">Contribution: Adaptive learning rate optimizer used to train tomato_model.h5.</p>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-850 space-y-1">
            <span className="text-[10px] font-bold text-indigo-400 font-mono">[6] ICAR & IARI Agronomic Bulletins (2024)</span>
            <p className="font-semibold text-slate-200">Integrated Disease & Pest Management Protocols for Solanaceous Crops</p>
            <p className="text-[11px] text-slate-400 italic">ICAR-IARI Technical Compendium, New Delhi, India.</p>
            <p className="text-[11px] text-emerald-400/90 pt-1">Contribution: Certified organic bio-fungicides, chemical dilution rates, and PHI periods.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
