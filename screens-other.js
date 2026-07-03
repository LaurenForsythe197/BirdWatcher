// ========================================
// BirdWatcher Web App
// Chunk 5: Screen Components (Part B - Sightings, Behaviors, Pet Care)
// ========================================

// ========================================
// SightingDetailModal Component
// ========================================

const SightingDetailModal = ({ visible, onClose, sighting, theme }) => {
  const behaviorsQuery = window.AppUtils.useQuery('behavior_logs', sighting ? { sighting_id: sighting.id } : {}, { column: 'logged_at', ascending: false });
  const behaviors = behaviorsQuery.data;
  const behaviorsLoading = behaviorsQuery.loading;

  if (!visible || !sighting) return null;

  const formatDate = window.AppUtils.formatDateTime;

  return React.createElement('div', { className: 'modal-overlay', onClick: onClose },
    React.createElement('div', { className: 'modal-sheet', onClick: (e) => e.stopPropagation() },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid ' + theme.border } },
        React.createElement('h2', { style: { flex: 1, color: theme.textPrimary } }, sighting.species_name),
        React.createElement('button', { 
          onClick: onClose,
          style: { background: 'none', border: 'none', fontSize: '28px', cursor: 'pointer', color: theme.textSecondary }
        }, '✕')
      ),

      React.createElement('div', { style: { flex: 1, overflowY: 'auto' } },
        sighting.photo_url && React.createElement('img', {
          src: sighting.photo_url,
          style: { width: '100%', height: '200px', borderRadius: '16px', objectFit: 'cover', marginBottom: '16px' }
        }),

        React.createElement('div', { style: { display: 'flex', gap: '8px', marginBottom: '16px' } },
          sighting.estimated_age && React.createElement('div', { style: { backgroundColor: '#F0EDF9', borderRadius: '10px', paddingLeft: '12px', paddingRight: '12px', paddingTop: '8px', paddingBottom: '8px' } },
            React.createElement('p', { style: { fontSize: '11px', color: theme.textSecondary, fontWeight: '600' } }, 'AGE'),
            React.createElement('p', { style: { fontSize: '13px', color: theme.primary, fontWeight: '700' } }, sighting.estimated_age)
          ),
          sighting.gender && React.createElement('div', { style: { backgroundColor: '#F0EDF9', borderRadius: '10px', paddingLeft: '12px', paddingRight: '12px', paddingTop: '8px', paddingBottom: '8px' } },
            React.createElement('p', { style: { fontSize: '11px', color: theme.textSecondary, fontWeight: '600' } }, 'GENDER'),
            React.createElement('p', { style: { fontSize: '13px', color: theme.primary, fontWeight: '700' } }, sighting.gender)
          ),
          React.createElement('div', { style: { backgroundColor: '#F0EDF9', borderRadius: '10px', paddingLeft: '12px', paddingRight: '12px', paddingTop: '8px', paddingBottom: '8px' } },
            React.createElement('p', { style: { fontSize: '11px', color: theme.textSecondary, fontWeight: '600' } }, 'DATE'),
            React.createElement('p', { style: { fontSize: '12px', color: theme.primary, fontWeight: '700' } }, formatDate(sighting.sighting_date))
          )
        ),

        sighting.location_notes && React.createElement('div', { className: 'info-box info-box-primary', style: { marginBottom: '10px' } },
          React.createElement('h4', { style: { fontSize: '12px', fontWeight: '700', marginBottom: '4px' } }, '📍 LOCATION'),
          React.createElement('p', { style: { fontSize: '13px' } }, sighting.location_notes)
        ),

        sighting.user_notes && React.createElement('div', { className: 'info-box info-box-primary', style: { marginBottom: '14px' } },
          React.createElement('h4', { style: { fontSize: '12px', fontWeight: '700', marginBottom: '4px' } }, '📝 NOTES'),
          React.createElement('p', { style: { fontSize: '13px' } }, sighting.user_notes)
        ),

        React.createElement('h3', { style: { fontSize: '16px', fontWeight: '700', color: theme.textPrimary, marginBottom: '10px' } }, '📋 Logged Behaviors'),
        behaviorsLoading
          ? React.createElement('div', { className: 'loading-container' }, React.createElement('div', { className: 'spinner' }))
          : (behaviors && behaviors.length > 0)
            ? behaviors.map((b) =>
                React.createElement('div', { key: b.id, className: 'info-box info-box-primary', style: { marginBottom: '8px' } },
                  React.createElement('h4', { style: { fontSize: '14px', fontWeight: '700', color: theme.textPrimary } }, b.behavior_type),
                  b.description && React.createElement('p', { style: { fontSize: '13px', marginTop: '2px' } }, b.description),
                  React.createElement('p', { style: { fontSize: '11px', color: '#A78BFA', marginTop: '4px' } }, formatDate(b.logged_at))
                )
              )
            : React.createElement('div', { style: { backgroundColor: '#F5F3FF', borderRadius: '12px', padding: '20px', textAlign: 'center' } },
                React.createElement('p', { style: { color: theme.textSecondary, fontSize: '14px' } }, 'No behaviors logged yet')
              )
      )
    )
  );
};

// ========================================
// SightingsScreen Component
// ========================================

const SightingsScreen = () => {
  const theme = window.AppUtils.useTheme();
  const state = window.AppUtils.useQuery('bird_sightings', {}, { column: 'sighting_date', ascending: false });
  const [selectedSighting, setSelectedSighting] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const renderSightingCard = (item) => {
    return React.createElement('div', {
      key: item.id,
      onClick: () => { setSelectedSighting(item); setShowDetail(true); },
      className: 'card card-clickable',
      style: { display: 'flex', marginBottom: '12px', cursor: 'pointer', alignItems: 'stretch' }
    },
      item.photo_url
        ? React.createElement('img', {
            src: item.photo_url,
            style: { width: '80px', height: '80px', objectFit: 'cover', borderRadius: '16px 0 0 16px' }
          })
        : React.createElement('div', { style: { width: '80px', height: '80px', backgroundColor: '#F0EDF9', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '16px 0 0 16px' } }, '🐦'),
      
      React.createElement('div', { style: { flex: 1, padding: '12px', display: 'flex', flexDirection: 'column' } },
        React.createElement('p', { style: { fontSize: '15px', fontWeight: '700', color: theme.colors.textPrimary, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, item.species_name),
        React.createElement('div', { style: { display: 'flex', gap: '6px', marginTop: '4px' } },
          item.estimated_age && React.createElement('span', { className: 'badge badge-primary', style: { fontSize: '11px', padding: '2px 6px' } }, item.estimated_age),
          item.gender && React.createElement('span', { className: 'badge badge-primary', style: { fontSize: '11px', padding: '2px 6px' } }, item.gender)
        ),
        React.createElement('p', { style: { fontSize: '11px', color: theme.colors.textSecondary, marginTop: '4px' } }, formatDate(item.sighting_date)),
        item.location_notes && React.createElement('p', { style: { fontSize: '11px', color: '#A78BFA', marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, '📍 ' + item.location_notes)
      ),

      React.createElement('div', { style: { display: 'flex', alignItems: 'center', paddingRight: '12px' } }, '›')
    );
  };

  return React.createElement('div', { className: 'screen' },
    React.createElement('div', { className: 'screen-header' },
      React.createElement('h1', null, '📋 My Sightings'),
      React.createElement('p', null, 'Your bird identification history')
    ),

    React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: '16px', paddingBottom: 'calc(var(--tab-height) + 16px)' } },
      state.loading
        ? React.createElement('div', { className: 'loading-container' }, React.createElement('div', { className: 'spinner' }))
        : (state.data && state.data.length > 0)
          ? React.createElement('div', null, state.data.map(renderSightingCard))
          : React.createElement('div', { className: 'empty-state' },
              React.createElement('div', { className: 'empty-state-icon' }, '🐦'),
              React.createElement('h2', { className: 'empty-state-title' }, 'No Sightings Yet'),
              React.createElement('p', { className: 'empty-state-description' }, 'Identify your first bird using the\nIdentify tab to save it here!')
            )
    ),

    React.createElement(SightingDetailModal, {
      visible: showDetail,
      onClose: () => { setShowDetail(false); },
      sighting: selectedSighting,
      theme: theme.colors
    })
  );
};

// ========================================
// AddBehaviorModal Component
// ========================================

const AddBehaviorModal = ({ visible, onClose, onSave, sightings, theme }) => {
  const [selectedSighting, setSelectedSighting] = useState(null);
  const [selectedBehavior, setSelectedBehavior] = useState(null);
  const [notes, setNotes] = useState('');
  const [speciesInput, setSpeciesInput] = useState('');

  if (!visible) return null;

  const handleSave = () => {
    if (!selectedBehavior) {
      alert('Select a behavior type');
      return;
    }
    onSave({ 
      sightingId: selectedSighting ? selectedSighting.id : null, 
      speciesInput: speciesInput, 
      behaviorType: selectedBehavior, 
      description: notes 
    });
    setSelectedSighting(null);
    setSelectedBehavior(null);
    setNotes('');
    setSpeciesInput('');
  };

  return React.createElement('div', { className: 'modal-overlay', onClick: onClose },
    React.createElement('div', { className: 'modal-sheet', onClick: (e) => e.stopPropagation() },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid ' + theme.border } },
        React.createElement('h2', { style: { flex: 1, color: theme.textPrimary } }, 'Log Behavior'),
        React.createElement('button', { 
          onClick: onClose,
          style: { background: 'none', border: 'none', fontSize: '28px', cursor: 'pointer', color: theme.textSecondary }
        }, '✕')
      ),

      React.createElement('div', { style: { flex: 1, overflowY: 'auto', marginBottom: '16px' } },
        React.createElement('label', { style: { fontSize: '14px', fontWeight: '600', color: theme.textPrimary, display: 'block', marginBottom: '8px' } }, 'Bird Species'),
        sightings && sightings.length > 0
          ? React.createElement('div', { style: { display: 'flex', gap: '8px', overflowX: 'auto', marginBottom: '12px', paddingBottom: '8px' } },
              sightings.slice(0, 10).map((s) =>
                React.createElement('button', {
                  key: s.id,
                  onClick: () => { setSelectedSighting(selectedSighting && selectedSighting.id === s.id ? null : s); setSpeciesInput(s.species_name); },
                  className: 'btn ' + (selectedSighting && selectedSighting.id === s.id ? 'btn-primary' : 'btn-secondary'),
                  style: { whiteSpace: 'nowrap', flexShrink: 0 }
                }, s.species_name.split(' ')[0])
              )
            )
          : null,

        React.createElement('input', {
          type: 'text',
          value: speciesInput,
          onChange: (e) => setSpeciesInput(e.target.value),
          placeholder: 'Or type species name...',
          style: { marginBottom: '16px' }
        }),

        React.createElement('label', { style: { fontSize: '14px', fontWeight: '600', color: theme.textPrimary, display: 'block', marginBottom: '10px' } }, 'Behavior Type *'),
        React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' } },
          window.AppUtils.BEHAVIOR_TYPES.map((b) =>
            React.createElement('button', {
              key: b,
              onClick: () => { setSelectedBehavior(selectedBehavior === b ? null : b); },
              className: 'btn ' + (selectedBehavior === b ? 'btn-primary' : 'btn-secondary'),
              style: { borderRadius: '20px' }
            }, b)
          )
        ),

        React.createElement('label', { style: { fontSize: '14px', fontWeight: '600', color: theme.textPrimary, display: 'block', marginBottom: '8px' } }, 'Notes'),
        React.createElement('textarea', {
          value: notes,
          onChange: (e) => setNotes(e.target.value),
          placeholder: 'Describe what you observed...',
          style: { marginBottom: '16px', minHeight: '80px' }
        })
      ),

      React.createElement('div', { style: { display: 'flex', gap: '10px', marginTop: '8px' } },
        React.createElement('button', { 
          onClick: onClose, 
          className: 'btn btn-secondary',
          style: { flex: 1 }
        }, 'Cancel'),
        React.createElement('button', { 
          onClick: handleSave, 
          className: 'btn btn-primary',
          style: { flex: 2 }
        }, 'Log Behavior')
      )
    )
  );
};

// ========================================
// BehaviorsScreen Component
// ========================================

const BehaviorsScreen = () => {
  const theme = window.AppUtils.useTheme();
  const state = window.AppUtils.useQuery('behavior_logs', {}, { column: 'logged_at', ascending: false });
  const sightingsState = window.AppUtils.useQuery('bird_sightings', {}, { column: 'sighting_date', ascending: false });
  const [showAddModal, setShowAddModal] = useState(false);

  const behaviorMutation = window.AppUtils.useMutation('behavior_logs', 'insert');

  const BEHAVIOR_ICONS = {
    'Eating': '🌾', 'Drinking': '💧', 'Singing': '🎵', 'Chirping': '🔊', 'Playing': '🎮',
    'Preening': '✨', 'Bathing': '🛁', 'Flying': '🛫', 'Nesting': '🏠', 'Foraging': '🔍',
    'Sleeping': '😴', 'Calling': '📢', 'Courting': '💕', 'Fighting': '⚡', 'Perching': '🦅'
  };

  const handleSaveBehavior = (data) => {
    const now = new Date().toISOString();
    behaviorMutation.mutate({
      id: window.AppUtils.generateUUID(),
      sighting_id: data.sightingId || window.AppUtils.generateUUID(),
      behavior_type: data.behaviorType,
      description: (data.speciesInput ? data.speciesInput + ': ' : '') + (data.description || ''),
      logged_at: now
    }).then(() => {
      setShowAddModal(false);
      state.refetch();
    }).catch((err) => {
      alert('Error: ' + err.message);
    });
  };

  const formatTime = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ' ' + d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return React.createElement('div', { className: 'screen' },
    React.createElement('div', { className: 'screen-header' },
      React.createElement('h1', null, '📊 Behavior Log'),
      React.createElement('p', null, 'Track what birds are doing')
    ),

    React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: '16px', paddingBottom: 'calc(var(--tab-height) + 80px)' } },
      state.loading
        ? React.createElement('div', { className: 'loading-container' }, React.createElement('div', { className: 'spinner' }))
        : (state.data && state.data.length > 0)
          ? React.createElement('div', null,
              state.data.map((item) => {
                const icon = BEHAVIOR_ICONS[item.behavior_type] || '🐦';
                return React.createElement('div', { key: item.id, className: 'card', style: { display: 'flex', alignItems: 'center', marginBottom: '10px' } },
                  React.createElement('div', { style: { width: '44px', height: '44px', borderRadius: '50%', backgroundColor: '#F0EDF9', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '12px', fontSize: '22px' } }, icon),
                  React.createElement('div', { style: { flex: 1 } },
                    React.createElement('p', { style: { fontSize: '15px', fontWeight: '700', color: theme.colors.textPrimary } }, item.behavior_type),
                    item.description && React.createElement('p', { style: { fontSize: '13px', color: theme.colors.textSecondary, marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, item.description),
                    React.createElement('p', { style: { fontSize: '11px', color: '#A78BFA', marginTop: '4px' } }, formatTime(item.logged_at))
                  )
                );
              })
            )
          : React.createElement('div', { className: 'empty-state' },
              React.createElement('div', { className: 'empty-state-icon' }, '📊'),
              React.createElement('h2', { className: 'empty-state-title' }, 'No Behaviors Logged'),
              React.createElement('p', { className: 'empty-state-description' }, "Tap the + button to start logging\nyour birds' behaviors!")
            )
    ),

    React.createElement('button', {
      onClick: () => { setShowAddModal(true); },
      className: 'fab',
      style: { bottom: 'calc(var(--tab-height) + 16px)' }
    }, '➕'),

    React.createElement(AddBehaviorModal, {
      visible: showAddModal,
      onClose: () => { setShowAddModal(false); },
      onSave: handleSaveBehavior,
      sightings: sightingsState.data,
      theme: theme.colors
    })
  );
};

// ========================================
// AddPetModal Component
// ========================================

const AddPetModal = ({ visible, onClose, onSave, theme }) => {
  const [petName, setPetName] = useState('');
  const [petSpecies, setPetSpecies] = useState('');
  const [dietNotes, setDietNotes] = useState('');
  const [entertainTips, setEntertainTips] = useState('');
  const [selectedPreset, setSelectedPreset] = useState(null);

  if (!visible) return null;

  const handlePreset = (species) => {
    setSelectedPreset(species.id);
    setPetSpecies(species.name);
    setDietNotes(species.diet);
    setEntertainTips(species.entertainment);
  };

  const handleSave = () => {
    if (!petName.trim() || !petSpecies.trim()) {
      alert('Enter pet name and species');
      return;
    }
    onSave({ name: petName, species: petSpecies, diet: dietNotes, entertainment: entertainTips });
    setPetName('');
    setPetSpecies('');
    setDietNotes('');
    setEntertainTips('');
    setSelectedPreset(null);
  };

  return React.createElement('div', { className: 'modal-overlay', onClick: onClose },
    React.createElement('div', { className: 'modal-sheet', onClick: (e) => e.stopPropagation() },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid ' + theme.border } },
        React.createElement('h2', { style: { flex: 1, color: theme.textPrimary } }, 'Add Pet Bird'),
        React.createElement('button', { 
          onClick: onClose,
          style: { background: 'none', border: 'none', fontSize: '28px', cursor: 'pointer', color: theme.textSecondary }
        }, '✕')
      ),

      React.createElement('div', { style: { flex: 1, overflowY: 'auto', marginBottom: '16px' } },
        React.createElement('label', { style: { fontSize: '14px', fontWeight: '700', color: theme.textPrimary, display: 'block', marginBottom: '10px' } }, 'Quick Select Species'),
        React.createElement('div', { style: { display: 'flex', gap: '8px', overflowX: 'auto', marginBottom: '16px', paddingBottom: '8px' } },
          window.AppUtils.PET_BIRD_SPECIES.map((sp) =>
            React.createElement('button', {
              key: sp.id,
              onClick: () => { handlePreset(sp); },
              className: 'btn ' + (selectedPreset === sp.id ? 'btn-primary' : 'btn-secondary'),
              style: { whiteSpace: 'nowrap', flexShrink: 0, fontSize: '12px' }
            }, sp.name.split(' ')[0])
          )
        ),

        React.createElement('label', { style: { fontSize: '14px', fontWeight: '600', color: theme.textPrimary, display: 'block', marginBottom: '6px' } }, "Pet's Name *"),
        React.createElement('input', {
          type: 'text',
          value: petName,
          onChange: (e) => setPetName(e.target.value),
          placeholder: 'e.g. Tweety, Polly...',
          style: { marginBottom: '12px' }
        }),

        React.createElement('label', { style: { fontSize: '14px', fontWeight: '600', color: theme.textPrimary, display: 'block', marginBottom: '6px' } }, 'Species *'),
        React.createElement('input', {
          type: 'text',
          value: petSpecies,
          onChange: (e) => setPetSpecies(e.target.value),
          placeholder: 'e.g. Budgerigar, Cockatiel...',
          style: { marginBottom: '12px' }
        }),

        React.createElement('label', { style: { fontSize: '14px', fontWeight: '600', color: theme.textPrimary, display: 'block', marginBottom: '6px' } }, 'Diet Notes'),
        React.createElement('textarea', {
          value: dietNotes,
          onChange: (e) => setDietNotes(e.target.value),
          placeholder: 'Feeding information and diet...',
          style: { marginBottom: '12px', minHeight: '70px' }
        }),

        React.createElement('label', { style: { fontSize: '14px', fontWeight: '600', color: theme.textPrimary, display: 'block', marginBottom: '6px' } }, 'Entertainment Tips'),
        React.createElement('textarea', {
          value: entertainTips,
          onChange: (e) => setEntertainTips(e.target.value),
          placeholder: 'How to keep your bird happy...',
          style: { marginBottom: '16px', minHeight: '70px' }
        })
      ),

      React.createElement('div', { style: { display: 'flex', gap: '10px', marginTop: '8px' } },
        React.createElement('button', { 
          onClick: onClose, 
          className: 'btn btn-secondary',
          style: { flex: 1 }
        }, 'Cancel'),
        React.createElement('button', { 
          onClick: handleSave, 
          className: 'btn btn-primary',
          style: { flex: 2 }
        }, 'Add Pet Bird')
      )
    )
  );
};

// ========================================
// PetBirdsScreen Component
// ========================================

const PetBirdsScreen = () => {
  const theme = window.AppUtils.useTheme();
  const petState = window.AppUtils.useQuery('pet_birds', {}, { column: 'added_date', ascending: false });
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeTab, setActiveTab] = useState('guides');
  const [selectedGuide, setSelectedGuide] = useState(null);

  const petMutation = window.AppUtils.useMutation('pet_birds', 'insert');

  const handleSavePet = (data) => {
    const now = new Date().toISOString();
    petMutation.mutate({
      id: window.AppUtils.generateUUID(),
      name: data.name,
      species_name: data.species,
      diet_notes: data.diet || null,
      entertainment_tips: data.entertainment || null,
      added_date: now
    }).then(() => {
      setShowAddModal(false);
      petState.refetch();
    }).catch((err) => {
      alert('Error: ' + err.message);
    });
  };

  const renderGuideCard = (species) => {
    const isSelected = selectedGuide && selectedGuide.id === species.id;
    return React.createElement('div', {
      key: species.id,
      onClick: () => { setSelectedGuide(isSelected ? null : species); },
      className: 'card card-clickable',
      style: { marginBottom: '12px', borderWidth: '1.5px', borderStyle: 'solid', borderColor: isSelected ? theme.colors.primary : theme.colors.border }
    },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', marginBottom: isSelected ? '14px' : 0 } },
        React.createElement('div', { style: { width: '56px', height: '56px', borderRadius: '28px', backgroundColor: '#E9D5FF', marginRight: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' } }, '🐦'),
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('p', { style: { fontSize: '15px', fontWeight: '700', color: theme.colors.textPrimary } }, species.name),
          React.createElement('p', { style: { fontSize: '12px', color: theme.colors.textSecondary, marginTop: '2px' } }, species.diet_schedule)
        ),
        React.createElement('span', { style: { fontSize: '20px' } }, isSelected ? '⬆️' : '⬇️')
      ),

      isSelected && React.createElement('div', null,
        React.createElement('div', { style: { height: '1px', backgroundColor: theme.colors.border, marginBottom: '14px' } }),
        React.createElement('div', { className: 'info-box info-box-warning', style: { marginBottom: '10px' } },
          React.createElement('h4', { style: { fontSize: '13px', fontWeight: '700', marginBottom: '6px' } }, '🌾 DIET & FEEDING'),
          React.createElement('p', { style: { fontSize: '13px', lineHeight: '20px' } }, species.diet)
        ),
        React.createElement('div', { className: 'info-box info-box-success' },
          React.createElement('h4', { style: { fontSize: '13px', fontWeight: '700', marginBottom: '6px' } }, '🎮 ENTERTAINMENT & ENRICHMENT'),
          React.createElement('p', { style: { fontSize: '13px', lineHeight: '20px' } }, species.entertainment)
        )
      )
    );
  };

  return React.createElement('div', { className: 'screen' },
    React.createElement('div', { className: 'screen-header' },
      React.createElement('h1', null, '🏠 Pet Bird Care'),
      React.createElement('p', null, 'Feeding guides and care tips')
    ),

    React.createElement('div', { className: 'tab-bar', style: { margin: '16px' } },
      React.createElement('button', {
        className: 'tab ' + (activeTab === 'guides' ? 'active' : ''),
        onClick: () => { setActiveTab('guides'); }
      }, 'Care Guides'),
      React.createElement('button', {
        className: 'tab ' + (activeTab === 'my-pets' ? 'active' : ''),
        onClick: () => { setActiveTab('my-pets'); }
      }, 'My Pet Birds')
    ),

    activeTab === 'guides'
      ? React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: '16px', paddingBottom: 'calc(var(--tab-height) + 16px)' } },
          window.AppUtils.PET_BIRD_SPECIES.map(renderGuideCard)
        )
      : React.createElement('div', { style: { flex: 1, display: 'flex', flexDirection: 'column' } },
          petState.loading
            ? React.createElement('div', { className: 'loading-container' }, React.createElement('div', { className: 'spinner' }))
            : (petState.data && petState.data.length > 0)
              ? React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: '16px', paddingBottom: 'calc(var(--tab-height) + 80px)' } },
                  petState.data.map((pet) =>
                    React.createElement('div', { key: pet.id, className: 'card', style: { marginBottom: '12px' } },
                      React.createElement('div', { style: { display: 'flex', alignItems: 'center', marginBottom: '12px' } },
                        React.createElement('div', { style: { width: '48px', height: '48px', borderRadius: '24px', backgroundColor: '#F0EDF9', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '12px', fontSize: '24px' } }, '🐦'),
                        React.createElement('div', { style: { flex: 1 } },
                          React.createElement('p', { style: { fontSize: '17px', fontWeight: '700', color: theme.colors.textPrimary } }, pet.name),
                          React.createElement('p', { style: { fontSize: '13px', color: theme.colors.primary, fontWeight: '600' } }, pet.species_name)
                        )
                      ),
                      pet.diet_notes && React.createElement('div', { className: 'info-box info-box-warning', style: { marginBottom: '8px' } },
                        React.createElement('h4', { style: { fontSize: '12px', fontWeight: '700', marginBottom: '4px' } }, '🌾 DIET'),
                        React.createElement('p', { style: { fontSize: '12px', lineHeight: '18px' } }, pet.diet_notes)
                      ),
                      pet.entertainment_tips && React.createElement('div', { className: 'info-box info-box-success' },
                        React.createElement('h4', { style: { fontSize: '12px', fontWeight: '700', marginBottom: '4px' } }, '🎮 ENTERTAINMENT'),
                        React.createElement('p', { style: { fontSize: '12px', lineHeight: '18px' } }, pet.entertainment_tips)
                      )
                    )
                  )
                )
              : React.createElement('div', { className: 'empty-state' },
                  React.createElement('div', { className: 'empty-state-icon' }, '🐦'),
                  React.createElement('h2', { className: 'empty-state-title' }, 'No Pet Birds Added'),
                  React.createElement('p', { className: 'empty-state-description' }, 'Tap + to add your pet bird\nand get personalized care info!')
                )
        ),

    activeTab === 'my-pets' && React.createElement('button', {
      onClick: () => { setShowAddModal(true); },
      className: 'fab',
      style: { bottom: 'calc(var(--tab-height) + 16px)' }
    }, '➕'),

    React.createElement(AddPetModal, {
      visible: showAddModal,
      onClose: () => { setShowAddModal(false); },
      onSave: handleSavePet,
      theme: theme.colors
    })
  );
};

// ========================================
// Export Components
// ========================================

window.AppComponents.SightingsScreen = SightingsScreen;
window.AppComponents.SightingDetailModal = SightingDetailModal;
window.AppComponents.BehaviorsScreen = BehaviorsScreen;
window.AppComponents.AddBehaviorModal = AddBehaviorModal;
window.AppComponents.PetBirdsScreen = PetBirdsScreen;
window.AppComponents.AddPetModal = AddPetModal;
