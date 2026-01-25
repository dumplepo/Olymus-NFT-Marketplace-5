import { motion } from 'motion/react';
import { useState } from 'react';
import { Upload, Sparkles } from 'lucide-react';
import { getContract } from '../web3/contract';

const categories = ['Gods', 'Titans', 'Heroes', 'Creatures', 'Artifacts'];

export function MintNFTSection({ walletAddress, onLightning }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Gods',
    collection: '',
    newCollection: false,
  });
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMint = async () => {
    onLightning();

    if (!formData.name || !imagePreview) {
      alert('Missing fields');
      return;
    }

    try {
      const contract = await getContract(true);

      // Normally: upload metadata to IPFS
      const tokenURI = imagePreview; // TEMP (replace with IPFS later)

      const tx = await contract.mintNFT(tokenURI);
      await tx.wait();

      alert('NFT Minted Successfully ⚡');
    } catch (err) {
      console.error(err);
      alert('Mint failed');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto px-8 py-12"
    >
      <div className="mb-8">
        <h2 className="text-3xl text-amber-400 tracking-wider mb-2">Forge New Artifact</h2>
        <p className="text-amber-100/60">Create and mint your own legendary NFT blessed by the gods</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-amber-100 mb-2 tracking-wide">NFT Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter the name of your divine artifact"
              className="w-full px-4 py-3 bg-slate-900/50 border border-amber-500/20 rounded-lg
                         text-amber-100 placeholder-amber-100/30 focus:outline-none focus:border-amber-500/40"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-amber-100 mb-2 tracking-wide">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Tell the legend of your creation..."
              rows={4}
              className="w-full px-4 py-3 bg-slate-900/50 border border-amber-500/20 rounded-lg
                         text-amber-100 placeholder-amber-100/30 focus:outline-none focus:border-amber-500/40
                         resize-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-amber-100 mb-2 tracking-wide">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 bg-slate-900/50 border border-amber-500/20 rounded-lg
                         text-amber-100 focus:outline-none focus:border-amber-500/40"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Collection */}
          <div>
            <label className="block text-amber-100 mb-2 tracking-wide">Collection</label>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.newCollection}
                  onChange={(e) => setFormData({ ...formData, newCollection: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="text-amber-100/70">Create new collection</span>
              </div>
              
              {formData.newCollection ? (
                <input
                  type="text"
                  value={formData.collection}
                  onChange={(e) => setFormData({ ...formData, collection: e.target.value })}
                  placeholder="Enter new collection name"
                  className="w-full px-4 py-3 bg-slate-900/50 border border-amber-500/20 rounded-lg
                             text-amber-100 placeholder-amber-100/30 focus:outline-none focus:border-amber-500/40"
                />
              ) : (
                <select
                  value={formData.collection}
                  onChange={(e) => setFormData({ ...formData, collection: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-amber-500/20 rounded-lg
                             text-amber-100 focus:outline-none focus:border-amber-500/40"
                >
                  <option value="">Select existing collection</option>
                  <option value="olympian-gods">Olympian Gods</option>
                  <option value="ancient-titans">Ancient Titans</option>
                  <option value="legendary-heroes">Legendary Heroes</option>
                </select>
              )}
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-amber-100 mb-2 tracking-wide">Artwork *</label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="block w-full px-4 py-8 bg-slate-900/50 border-2 border-dashed border-amber-500/20 
                           rounded-lg cursor-pointer hover:border-amber-500/40 transition-colors"
              >
                <div className="text-center">
                  <Upload className="w-12 h-12 text-amber-400 mx-auto mb-3" />
                  <p className="text-amber-100 mb-1">Click to upload image</p>
                  <p className="text-amber-100/50 text-sm">PNG, JPG, GIF up to 10MB</p>
                </div>
              </label>
            </div>
          </div>

          {/* Mint Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleMint}
            className="w-full px-6 py-4 bg-gradient-to-r from-amber-600 to-amber-500 
                       hover:from-amber-500 hover:to-amber-400 text-slate-950 
                       rounded-lg flex items-center justify-center gap-3
                       shadow-[0_0_30px_rgba(251,191,36,0.4)] hover:shadow-[0_0_50px_rgba(251,191,36,0.6)]
                       transition-all duration-300"
          >
            <Sparkles className="w-5 h-5" />
            <span className="text-lg tracking-wider">MINT NFT</span>
            <Sparkles className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Preview */}
        <div className="lg:sticky lg:top-32 h-fit">
          <div className="bg-slate-900/50 backdrop-blur-sm border border-amber-500/20 rounded-xl p-6">
            <h3 className="text-xl text-amber-400 tracking-wide mb-4">Preview</h3>
            
            <div className="aspect-[1/1.618] bg-slate-800 rounded-lg overflow-hidden mb-4">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center text-amber-100/30">
                    <Upload className="w-16 h-16 mx-auto mb-3" />
                    <p>Upload image to preview</p>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <div>
                <div className="text-amber-100/50 text-sm mb-1">Name</div>
                <div className="text-amber-100">{formData.name || 'Untitled'}</div>
              </div>
              
              <div>
                <div className="text-amber-100/50 text-sm mb-1">Category</div>
                <div className="inline-block px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40">
                  <span className="text-xs text-amber-400 tracking-wider">{formData.category}</span>
                </div>
              </div>

              {formData.description && (
                <div>
                  <div className="text-amber-100/50 text-sm mb-1">Description</div>
                  <div className="text-amber-100/70 text-sm">{formData.description}</div>
                </div>
              )}

              <div>
                <div className="text-amber-100/50 text-sm mb-1">Creator</div>
                <div className="text-amber-100 text-sm">{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
